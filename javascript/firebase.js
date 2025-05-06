import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, query, where, doc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

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
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function getNewEmailID(){
    const emailCount = await getDocs(collection(db, 'emails'));
    return emailCount.size + 1
}

export async function getEmailsByFolder(folder) {
    const folderQuery = query(collection(db, "emails"), where("folder", "==", folder))
    const snapshot = await getDocs(folderQuery);
    return snapshot.docs.map(doc => doc.data());
}

export async function sendEmailToDB({to, subject, body, index, folder, encrypted, currentEmail}){

    const newEmail = {
        to,
        subject,
        body,
        date: new Date().toISOString(),
        from: currentEmail,
        index,
        folder,
        deleted: false,
        encrypted
    }

    await addDoc(collection(db, "emails"), newEmail);
    to === currentEmail ? await addDoc(collection(db, "emails"), {...newEmail, folder: "sent"}) : ""
}

export async function sendEmailToTrash(index){
    const docQuery = query(collection(db, "emails"), where("index", "==", index))
    const querySnapshot = await getDocs(docQuery)

    for (const email of querySnapshot.docs){
        await updateDoc(doc(db, "emails", email.id), {
            deleted: true,
            folder: "trash"
        })
    }
}

export async function deleteEmailFromDB(index){
    const docQuery = query(collection(db, "emails"), where("index", "==", index))
    const querySnapshot = await getDocs(docQuery)
    
    for (const email of querySnapshot.docs){
        await deleteDoc(doc(db, "emails", email.id));
    }
}

export { db };