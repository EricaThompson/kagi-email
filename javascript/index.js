const emails = [
    ["tina", "getting into it", "this is an email"],
    ["nina", "today", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."], 
    ["celine", "if only", "final email"],
    ["tina", "season's greetings", "this is an email"],
    ["nina", "goodnight", "another email"], 
    ["celine", "weather update", "final email"],
    ["tina", "time for sunset", "this is an email"],
    ["nina", "leaves are here", "another email"], 
    ["celine", "spring's on the way", "final email"]
]

// const from = document.getElementById("from")

emails.map(([sender, subject, body])=> {
  const eachEmail = document.createElement("tr");
  eachEmail.classList.add("each-email")
  eachEmail.innerHTML = `
                  <td class="sender">
                    ${sender}
                  </td>
                  
                  <td >
                    <div class="subject-message">${subject} - ${body}</div>
                  </td>
            `

  emailBody.appendChild(eachEmail);
})


