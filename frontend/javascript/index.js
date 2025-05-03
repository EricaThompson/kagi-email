// import { emails, months } from "../../backend/data/emails.js"
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

let emails;
(async function fetchEmails(){
  try {
    const res = await fetch ('http://localhost:5197/emails');
    const data = await res.json();
    emails = data
    console.log('fetch: ', data)
    
    emails.map(({ body, date, id, sender, subject })=> {
      const eachEmail = document.createElement("tr");
      eachEmail.classList.add("each-email")
      eachEmail.innerHTML = `<td class="sender">${sender} </td>
                            <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
                            <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>`
      eachEmail.classList.add("collapse")
      eachEmail.addEventListener("click", () => {
        eachEmail.classList.toggle("expand-email")
      })
    
      emailBody.appendChild(eachEmail);
    })

  } catch (err) {
    console.log('fetch err: ', err)
  }
})()

console.log('closure: ',emails)
emails && (emails.map(([body, date, id, sender, subject, ])=> {

  const eachEmail = document.createElement("tr");
  eachEmail.classList.add("each-email")
  eachEmail.innerHTML = `<td class="sender">${sender} </td>
                        <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>
                        <td class="date">${months[date.split("-")[1]-1]} ${date.split("-")[2]} </td>`
  eachEmail.classList.add("collapse")
  eachEmail.addEventListener("click", () => {
    eachEmail.classList.toggle("expand-email")
  })

  emailBody.appendChild(eachEmail);
}))

const composeButton = document.getElementById("compose-btn")
const composeEmail = document.getElementById("compose-email")
// const closeBtn = document.getElementById("close-btn")

composeEmail.classList.add("hide-compose-email")
composeButton.addEventListener("click", () => {
  composeEmail.classList.toggle("show-compose-email")

})

composeEmail.innerHTML = `<section>
        <form action="submit" class="form-container">
            <section class="compose-body">
                <div class="form-header">
                  <div><h1 >New Email</h1></div> 
                  <div id="close-btn"><button type="button">✖️</button></div>
                </div>
                <div><input type="email" class="form-input" placeholder="to:"></div>
                <div><input type="text" class="form-input" placeholder="subject:"></div>
                <div class="body"><textarea type="text" placeholder="compose:"></textarea></div>
                <button class="send-btn">send</button>
            </section>
        </form>
    </section>`

const closeBtn = document.getElementById("close-btn")

closeBtn.addEventListener("click", () => {
  composeEmail.classList.toggle("show-compose-email")
})


