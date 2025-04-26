const emails = [
    ["tina", "getting into it", "this is an email"],
    ["nina", "today", "another email"], 
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
  const eachEmail = document.createElement("tbody");
  eachEmail.classList.add("each-email")
  eachEmail.innerHTML = `
                <tr class="raise">
                  <td class="sender">
                    ${sender}
                  </td>
                  <td class="subject" >
                    ${subject} - 
                  </td>
                  <td class="message">${body}</td>
                </tr>
            `

  table.appendChild(eachEmail);
})


// emails.map(([sender, subject, body]) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<strong>${sender}</strong> `;
//     from.appendChild(li);
//   });

// const message = document.getElementById("message")

// emails.map(([sender, subject, body]) => {
//     const li = document.createElement("li");
//     li.innerHTML = `<strong>${subject}</strong> -- <small>${body}</small>`;
//     message.appendChild(li);
// });

emails.map(() => {
  const separator = document.createElement("div");
  separator.innerHTML = `<div></div>`
  line.appendChild(separator)
})