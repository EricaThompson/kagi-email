import { db, getEmailsByFolder, sendEmailToDB, getNewEmailID, deleteEmailFromDB, sendEmailToTrash } from './firebase.js';
import * as openpgp from 'https://cdn.jsdelivr.net/npm/openpgp@5.10.0/+esm';

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

async function fetchEmails(){
  
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

  if (sortedEmails.length){
    sortedEmails.map(({ body, date, index, from, subject, to, deleted })=> {

      const eachEmail = document.createElement("tr");
      eachEmail.classList.add("each-email")
      
      eachEmail.innerHTML = folder != "sent" ? 
        `<td class="sender">${from} </td>
        <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
        <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[1]} </td><span class="delete-icon">❌</span>` : 
        `<td class="to"><span class="to-label">To:</span> ${to} </td>
        <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
        <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[1]} </td> <span class="delete-icon">❌</span>`
      
      eachEmail.classList.add("collapse")
      eachEmail.addEventListener("click", () => {
        eachEmail.classList.toggle("expand-email")
      })
  
      const deleteIcon = eachEmail.querySelector(".delete-icon")
      deleteIcon.addEventListener("click", (e)=>{
        e.stopPropagation();
        deleteEmail(index, deleted);
      })
  
      emailBody.appendChild(eachEmail);
    })} else {
      emailBody.innerHTML = "Mailbox is Empty"
    }
  }
 
async function sendEmail(e) {
  e.preventDefault();

  const to = e.target.querySelector('input[type="email"]').value || "you@you.com"
  const subject = e.target.querySelector('input[type="text"]').value || "🐣 this is a subject"
  let body = e.target.querySelector('textarea').value || "that is the email body"
  const index = await getNewEmailID();
  const folder = to === "me@me.com" ? "inbox" : "sent"
  
  const passphrase = document.getElementById("encryption-passphrase")?.value;

  if (passphrase) {
    const encrypted = await openpgp.encrypt({
      message: await openpgp.createMessage({ text: body }),
      passwords: [passphrase],
      format: 'armored'
    });
    body = encrypted;
  }

  try {
    await sendEmailToDB({to, subject, body, index, folder})
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
                <div><input type="email" class="form-input" placeholder="to:"></div>
                <div><input type="text" class="form-input" placeholder="subject:"></div>
                <div class="body"><textarea type="text" placeholder="compose:"></textarea></div>
                <button id="send-btn" class="send-btn">send</button>
                <label> encrypt?</label><input class="encrypter" type="checkbox"><div id="encryption-form"></div>
            </section>
        </form>
    </section>`


const closeBtn = document.getElementById("close-btn")
const emailForm = document.getElementById("emailForm")
const encryptCheckbox = document.querySelector(".encrypter")
const encryptionForm = document.getElementById("encryption-form")

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

fetchEmails()
