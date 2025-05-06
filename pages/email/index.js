import { db, getEmailsByFolder, sendEmailToDB, getNewEmailID, deleteEmailFromDB, sendEmailToTrash } from '../../javascript/firebase.js';
import * as openpgp from 'https://cdn.jsdelivr.net/npm/openpgp@5.10.0/+esm';
import { getAuth, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';

const auth = getAuth();
let currentUser
let currentEmail 


onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
    currentEmail = user.email;
    console.log("Logged in as:", currentEmail);

  } else {
    window.location.href = "/pages/login/login.html";
  }
})

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let sent = false
let inbox = true
let trash = false

const inboxTab = document.getElementById("inbox")
const sentTab = document.getElementById("sent")
const trashTab = document.getElementById("trash")
inboxTab.classList.add("selected")
inboxTab.addEventListener("click", ()=>{
  inbox = true
  sent = false
  trash = false
  inboxTab.classList.add("selected")
  sentTab.classList.remove("selected")
  trashTab.classList.remove("selected")
  fetchEmails();
})
sentTab.addEventListener("click", ()=>{
  sent = true
  inbox = false
  trash = false
  sentTab.classList.add("selected")
  inboxTab.classList.remove("selected")
  trashTab.classList.remove("selected")
  fetchEmails();
})
trashTab.addEventListener("click", ()=>{
  sent = false
  inbox = false
  trash = true
  sentTab.classList.remove("selected")
  inboxTab.classList.remove("selected")
  trashTab.classList.add("selected")
  fetchEmails();
})

async function fetchEmails(){
  
  emailBody.innerHTML = 'loading...'
  
  let folder

  if (inbox){
    folder = "inbox"
  } else if (sent){
    folder = "sent"
  } else {
    folder = "trash"
  }

  const data = await getEmailsByFolder(folder);
  const sortedEmails = data.sort((a,b) => new Date(b.date) - new Date(a.date) )

  emailBody.innerHTML = ""
  
  if (!sortedEmails.length){
    if(folder === "inbox"){
      return emailBody.innerHTML = "Folder is empty, send an email to yourself (or my.dev.demo.user@gmail.com for the Demo User account) to populate."
    } else if (folder === "sent") {
      return emailBody.innerHTML = "Folder is empty, send an email to any address to populate."
    } else {
      return emailBody.innerHTML = "Folder is empty, delete an email to populate."
    }
  } 

  sortedEmails.map(({ body, date, index, subject, to, deleted, encrypted, from })=> {

    const eachEmail = document.createElement("tr");
    eachEmail.classList.add("each-email")

    eachEmail.innerHTML =  
      `<td class="sender">${folder === "sent" ? `<span class="to-label">To:</span> ${to}` : to }</td>
        <td><div class="subject">${subject}</div>
          <div class="subject-message">
            ${encrypted ? `<label>🔒 Encrypted Message Decrypt?</label><input class="decrypter" type="checkbox"><div id="decryption-form"></div>` : ""}
            <span class="body-style">${!encrypted ? body : "" }<span>
          </div>
        </td>
      <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[1]} </td><span class="delete-icon">❌</span>`
    
    eachEmail.classList.add("collapse")
    
    const subjectExpand = eachEmail.querySelector(".subject")

    subjectExpand.addEventListener("click", () => {
      eachEmail.classList.toggle("expand-email")
    })
    const deleteIcon = eachEmail.querySelector(".delete-icon")
    deleteIcon.addEventListener("click", (e)=>{
      e.stopPropagation();
      deleteEmail(index, deleted);
    })

    emailBody.appendChild(eachEmail);

    if (encrypted) {
      const decryptCheckbox = eachEmail.querySelector(".decrypter");
      const decryptionForm = eachEmail.querySelector("#decryption-form");
    
      if (decryptCheckbox && decryptionForm) {
        decryptCheckbox.addEventListener("change", (e) => {
          if (e.target.checked) {
            decryptionForm.innerHTML = `
              <div">
                <input type="text" placeholder="Enter passphrase" class="passphrase-input" value="My-Passphrase!" />
                <button class="send-btn decrypt-btn">Decrypt</button>
                <div class="decrypted-result"></div>
              </div>
            `;
        
            const decryptBtn = decryptionForm.querySelector(".decrypt-btn");
            const passphraseInput = decryptionForm.querySelector(".passphrase-input");
            const resultDiv = decryptionForm.querySelector(".decrypted-result");
        
            decryptBtn.addEventListener("click", async () => {
              const passphrase = passphraseInput.value.trim();
              try {
                const message = await openpgp.readMessage({ armoredMessage: body });
                const { data: decrypted } = await openpgp.decrypt({
                  message,
                  passwords: [passphrase],
                  format: "utf8",
                });
                resultDiv.innerHTML = decrypted;
              } catch (err) {
                resultDiv.innerHTML = "Incorrect Passphrase.";
                console.error("Decryption error:", err);
              }
            });
        
          } else {
            decryptionForm.innerHTML = "";
          }
        });
      }
    }
  })
}
 
async function sendEmail(e) {
  e.preventDefault();
  const to = e.target.querySelector('input[type="email"]').value || "you@you.com"
  const subject = e.target.querySelector('input[type="text"]').value || "🐣 this is a subject"
  let body = e.target.querySelector('textarea').value || "that is the email body"
  const index = await getNewEmailID();
  const folder = to === currentEmail ? "inbox" : "sent"
  let encrypted = false;
  
  const passphrase = document.getElementById("encryption-passphrase")?.value;

  if (passphrase) {
    const encryptedBody = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: body }),
      passwords: [passphrase],
      format: 'armored'
    });
    body = encryptedBody;
    encrypted = true;
  }

  try {
    await sendEmailToDB({to, subject, body, index, folder, encrypted, currentEmail})
    await fetchEmails();
    document.querySelectorAll('input, textarea').forEach(field => {
      field.value = ''
      field.checked = false
    });
    encryptionForm.innerHTML = ""
    
    composeEmail.classList.remove("show-compose-email")

  } catch (err) {
    console.log("Error sending email: ", err);
  }
}

async function deleteEmail(index, deleted){
  if (!deleted){
    sendEmailToTrash(index)
  } else {
    const confirmed = window.confirm("confirm delete?")

    try {
      if(confirmed){
        await deleteEmailFromDB(index)
      }

    } catch (err){
      console.log('error deleting email:', err)
    }
  }
  
  fetchEmails();
}

const composeButton = document.getElementById("compose-btn")
const composeEmail = document.getElementById("compose-email")

composeEmail.classList.add("hide-compose-email")
composeButton.addEventListener("click", () => {
  composeEmail.classList.toggle("show-compose-email")
})

composeEmail.innerHTML = `
      <section>
        <form id="emailForm" class="form-container">
            <section class="compose-body">
                <div class="form-header">
                  <div><h1>New Email</h1></div> 
                  <div id="close-btn"><button type="button">✖️</button></div>
                </div>
                <div><input type="email" class="form-input" placeholder="to:" value="my.dev.demo.user@gmail.com"></div>
                <div><input type="text" class="form-input" placeholder="subject:" value="Note to Self"></div>
                <div class="body">
<textarea type="text" placeholder=" compose: Click "send" to send a demo email.">

Hi,

Welcome to my email client. ✉️

If you send this email, it will send to yourself. 📥

You can encrypt the message below with the provided passphrase or create your own. 🔐

If you delete messages, they will go to the trash folder where you can permanently delete them from the server. 🗑️


Enjoy!</textarea></div>
                  <div id="encryption-form"></div>
                  <button id="send-btn" class="send-btn">Send</button>
                  <label> Encrypt?</label><input class="encrypter" type="checkbox">
            </section>
        </form>
    </section>`


const closeBtn = document.getElementById("close-btn")
const emailForm = document.getElementById("emailForm")
const emailInput = document.querySelector(".form-input")
const encryptCheckbox = document.querySelector(".encrypter")
const encryptionForm = document.getElementById("encryption-form")
const logoutBtn = document.querySelector(".logout-btn")

encryptCheckbox.addEventListener("change", ()=>{
  if (encryptCheckbox.checked ){
    encryptionForm.innerHTML = `
  <div id="symmetric-encryption">
    <input id="encryption-passphrase" class="passphrase-input" type="text" placeholder="Enter passphrase" value="My-Passphrase!" />
  </div>`
  } else {
    encryptionForm.innerHTML = ""
  }
})

emailForm.addEventListener("submit", sendEmail)
closeBtn.addEventListener("click", () => {
  composeEmail.classList.toggle("show-compose-email")
})

logoutBtn.addEventListener("click", ()=>{
  const confirmation = confirm("log out?")

  if (confirmation){
    signOut(auth).then(()=> {
      window.location.href = "/pages/login/login.html"
    }).catch((err) => {
      console.log("Logout Error: ", err)
    })
  }
})

fetchEmails()
