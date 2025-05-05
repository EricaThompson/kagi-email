import { db, getEmailsByFolder, sendEmailToDB, getNewEmailID } from './firebase.js';

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
let sent = false
let inbox = true
let emails;

const inboxTab = document.getElementById("inbox")
const sentTab = document.getElementById("sent")
inboxTab.classList.add("selected")
inboxTab.addEventListener("click", ()=>{
  inbox = true
  sent = false
  inboxTab.classList.add("selected")
  sentTab.classList.remove("selected")
  fetchEmails();
})
sentTab.addEventListener("click", ()=>{
  sent = true
  inbox = false
  sentTab.classList.add("selected")
  inboxTab.classList.remove("selected")
  fetchEmails();
})

console.log("mailbox: ", inbox, sent)


// async function fetchEmails(){
//   if (inbox){
//     try {
//       const res = await fetch ('http://localhost:5197/inbox');
//       const data = await res.json();
//       emailBody.innerHTML = ""
//       data.map(({ body, date, id, sender, subject })=> {

//         const eachEmail = document.createElement("tr");
//         eachEmail.classList.add("each-email")
//         eachEmail.innerHTML = `<td class="sender">${sender} </td>
//                               <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
//                               <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>`
//         eachEmail.classList.add("collapse")
//         eachEmail.addEventListener("click", () => {
//           eachEmail.classList.toggle("expand-email")
//         })
      
//         emailBody.appendChild(eachEmail);
//       })
//     } catch (err) {
//       console.log('fetch err: ', err)
//     }
//   } else if (sent) {
//     try {
//       const res = await fetch ('http://localhost:5197/sent');
//       const data = await res.json();
//       emailBody.innerHTML = ""
//       data.map(({ body, date, id, sender, subject, to })=> {

//         const eachEmail = document.createElement("tr");
//         eachEmail.classList.add("each-email")
//         eachEmail.innerHTML = `<td class="to"><span class="to-label">To:</span> ${to} </td>
//                               <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
//                               <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>`
//         eachEmail.classList.add("collapse")
//         eachEmail.addEventListener("click", () => {
//           eachEmail.classList.toggle("expand-email")
//         })
      
//         emailBody.appendChild(eachEmail);
//       })
//     } catch (err) {
//       console.log('fetch err: ', err)
//     }
//   }
// }

async function fetchEmails(){
  const folder = inbox ? "inbox" : "sent"
  const data = await getEmailsByFolder(folder);

  emailBody.innerHTML = ""

  data.map(({ body, date, index, from, subject, to })=> {

  const eachEmail = document.createElement("tr");
  eachEmail.classList.add("each-email")
  
  eachEmail.innerHTML = folder === ("inbox" || "trash") ? 
    `<td class="sender">${from} </td>
    <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
    <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>` : 
    `<td class="to"><span class="to-label">To:</span> ${to} </td>
    <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
    <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>`
  
  eachEmail.classList.add("collapse")
  eachEmail.addEventListener("click", () => {
    eachEmail.classList.toggle("expand-email")
  })

  emailBody.appendChild(eachEmail);
})}

// async function sendEmail(e) {
//   e.preventDefault();

//   const to = e.target.querySelector('input[type="email"]').value || "you@you.com"
//   const subject = e.target.querySelector('input[type="text"]').value || "🐣 this is a subject"
//   const body = e.target.querySelector('textarea').value || "that is the email body"

//   try {
//     const res = await fetch('http://localhost:5197/submit', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ to, subject, body })
//     });

//     if (res.ok) {
//       await fetchEmails();
//     } else {
//       console.log('send fail');
//     }

//     composeEmail.classList.remove("show-compose-email");
//     e.target.reset(); 
//   } catch (err) {
//     console.log("Error sending email:", err);
//   }
// }

async function sendEmail(e) {
  e.preventDefault();

  const to = e.target.querySelector('input[type="email"]').value || "you@you.com"
  const subject = e.target.querySelector('input[type="text"]').value || "🐣 this is a subject"
  const body = e.target.querySelector('textarea').value || "that is the email body"
  const index = await getNewEmailID();
  console.log("index: ", index)
  const folder = to === "me@me.com" ? "inbox" : "sent"

  
  try {
    await sendEmailToDB({to, subject, body, index, folder})
    await fetchEmails();
  } catch (err) {
    console.log("Error sending email:", err);
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
            </section>
        </form>
    </section>`

const closeBtn = document.getElementById("close-btn")
const emailForm = document.getElementById("emailForm")

emailForm.addEventListener("submit", sendEmail)
closeBtn.addEventListener("click", () => {
  composeEmail.classList.toggle("show-compose-email")
})

fetchEmails()
