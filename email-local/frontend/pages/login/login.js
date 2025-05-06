import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword  } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const auth = getAuth();
const emailBtn = document.getElementById("email-btn")
const emailForm = document.getElementById("email-form")
const loginBtn = document.getElementById("login-btn")

const handleRegistration=(email, password)=> {
    const email = e.target.querySelector('input[type="email"]').value
    const password = e.target.querySelector('input[type="password"]').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // go to inbox

    })
    .catch((err) => {
      const errCode = err.code;
      const errMessage = err.message;
      // ..
    });
}

const handleLogin=(email, password)=> {
    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
    // window.location.href = "/index"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}

emailBtn.addEventListener("click", () => {
    emailForm.classList.toggle("show-email-form")
})

loginBtn.addEventListener("click", () => {
    const email = e.target.querySelector('input[type="email"]').value
    const password = e.target.querySelector('input[type="password"]').value
    
    handleLogin(email, password)
})
