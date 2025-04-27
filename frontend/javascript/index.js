const emails = [
    ["tina", "getting into it", `click this email to expand 
      
      you can then see the rest of the contents here and below
      
      if there is more content`, 1],
    ["nina - the one and only", "today", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 2], 
    ["celine", "if only", `final email, Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`, 3],
    ["tina", "season's greetings", `this is an email, 
      
      Lorem ipsum dolor sit amet, 
      
      consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
      Duis aute irure dolor in reprehenderit in voluptate 

      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum`, 4],
    ["nina", "goodnight", "another email", 5], 
    ["celine", "weather update", "final email", 6],
    ["tina", "time for sunset", "this is an email", 7],
    ["nina", "leaves are here", "another email", 8], 
    ["celine", "spring's on the way", "final email", 9]
]

emails.map(([sender, subject, body])=> {

  const eachEmail = document.createElement("tr");
  eachEmail.classList.add("each-email")
  eachEmail.innerHTML = `<td class="sender">${sender} </td>
                        <td><div class="subject-message"><span>${subject}<span><span class="body-style"> - ${body}<span></div></td>`
  eachEmail.classList.add("collapse")
  eachEmail.addEventListener("click", () => {
    eachEmail.classList.toggle("expand-email")
  })

  emailBody.appendChild(eachEmail);
})

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


