import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword  
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyBj3640UPz59Cj8eP8yVq_U7oPQpvehR0g",
  authDomain: "kagi-email-app.firebaseapp.com",
  projectId: "kagi-email-app",
  storageBucket: "kagi-email-app.firebasestorage.app",
  messagingSenderId: "964381072526",
  appId: "1:964381072526:web:d8d4eb9d30e728b482bddf",
  measurementId: "G-HCT6J0BEQY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const emailBtn = document.getElementById("email-btn")
const emailForm = document.getElementById("email-form")
const loginBtn = document.getElementById("login-btn")
const loginError = document.querySelector(".login-error")
const email = document.querySelector('.login-email')
const password = document.querySelector('.login-password')

const handleRegistration=()=> {
    const email = document.querySelector('input[type="email"]').value
    const password = document.querySelector('input[type="password"]').value

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

const handleLogin=()=> {
    const email = document.querySelector('.login-email').value
    const password = document.querySelector('.login-password').value
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      window.location.href = "/pages/email/index.html"
    })
    .catch((err) => {
      loginError.classList.add("show")
      const errCode = err.code;
      const errMessage = err.message;
    });

}

emailBtn.addEventListener("click", () => {
    emailForm.classList.toggle("show-email-form")
})

loginBtn.addEventListener("click", () => {
  handleLogin()
})

email.addEventListener("input", (e)=> {
  loginError.classList.remove("show")
})

password.addEventListener("input", (e)=> {
  loginError.classList.remove("show")
})
