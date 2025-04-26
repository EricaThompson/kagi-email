const emails = [
    ["tina", "mark", "this is an email"],
    ["nina", "stu", "another email"], 
    ["celine", "solo", "final email"]
    ["tina", "mark", "this is an email"],
    ["nina", "stu", "another email"], 
    ["celine", "solo", "final email"]
    ["tina", "mark", "this is an email"],
    ["nina", "stu", "another email"], 
    ["celine", "solo", "final email"]
]

const inbox = document.getElementById("inbox")

emails.map(([from, body]) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${from}</strong>  |  ${body}`;
    inbox.appendChild(li);
  });