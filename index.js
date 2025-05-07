import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword  
} from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
// import localFirebaseConfig from './backend/localFirebaseConfig.js'
import firebaseConfig from './backend/firebaseConfig.js';

let config
if (VERCEL){
  config = {
    FIREBASE_API_KEY,
    FIREBASE_AUTH_DOMAIN,
    FIREBASE_PROJECT_ID,
    FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID,
    FIREBASE_APP_ID,
    FIREBASE_MEASUREMENT_ID
  }
} else {
  config = firebaseConfig;
}


const app = initializeApp(config);
const auth = getAuth();
const demoLoginBtn = document.getElementById("demo-login-btn")
const emailBtn = document.getElementById("email-btn")
const emailForm = document.getElementById("email-form")
const registerLink = document.querySelector(".register-link")
const registerForm = document.querySelector(".register-form")
const registerBtn = document.getElementById("register-btn")
const registerEmail = document.querySelector(".register-email")
const registerPassword = document.querySelector(".register-password")
const registerError = document.querySelector(".register-error");
const loginBtn = document.getElementById("login-btn")
const loginError = document.querySelector(".login-error")
const loginEmail = document.querySelector('.login-email')
const loginPassword = document.querySelector('.login-password')

const handleRegistration=()=> {
    const email = document.querySelector('.register-email').value
    const password = document.querySelector('.register-password').value

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "/email/email.html"
    })
    .catch((err) => {
      registerError.innerHTML = err.message.replace(/^Firebase:\s*/, "")
    });
}

const handleLogin=(type)=> {
  let email = document.querySelector('.login-email').value
  let password = document.querySelector('.login-password').value
  
  if (type === "demo"){
    email = "demo@kagi.com" 
    password = "Kagi-Email"
  } 
    
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = "/email/email.html"
    })
    .catch((err) => {
      loginError.innerHTML = err.message.replace(/^Firebase:\s*/, "")
    });

}

demoLoginBtn.addEventListener("click",()=> {
  handleLogin("demo")
})

emailBtn.addEventListener("click", () => {
    emailForm.classList.toggle("show")
})

loginBtn.addEventListener("click", () => {
  handleLogin()
})

registerLink.addEventListener("click", ()=>{
  registerForm.classList.toggle("show")
  emailForm.classList.remove("show")
})

registerBtn.addEventListener("click", ()=> {
  handleRegistration()
})

loginEmail.addEventListener("input", ()=> {
  loginError.innerHTML = ""
})

loginPassword.addEventListener("input", ()=> {
  loginError.innerHTML = ""
})

registerEmail.addEventListener("input", ()=> {
  registerError.innerHTML = ""
})

registerPassword.addEventListener("input", ()=> {
  registerError.innerHTML = ""
})
