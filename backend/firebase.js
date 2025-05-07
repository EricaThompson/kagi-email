import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-analytics.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, updateDoc, query, where, doc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';
// import localFirebaseConfig from './localFirebaseConfig.js'
import firebaseConfig from './firebaseConfig.js';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export async function getNewEmailID(){
    const emailCount = await getDocs(collection(db, 'emails'));
    return emailCount.size + 1
}

export async function getEmailsByFolder(folder, user) {
    let folderQuery
    if (folder === "inbox"){
        folderQuery = query(collection(db, "emails"),
            where("folder", "==", "inbox"),
            where("to", "==", user.email),
            where("owner", "==", user.email)
        )
    }
    if (folder === "sent"){
        folderQuery = query(collection(db, "emails"),
            where("folder", "==", "sent"),
            where("from", "==", user.email),
            where("owner", "==", user.email)
        )
    }
    if (folder === "trash"){
        folderQuery = query(collection(db, "emails"),
            where("folder", "==", "trash"),
            where("owner", "==", user.email)
        )
    }
    const snapshot = await getDocs(folderQuery);
    return snapshot.docs.map(doc => doc.data());
}

export async function sendEmailToDB({to, subject, body, index, encrypted, user}){
    let newIndex = index
    const newEmail = {
        to,
        subject,
        body,
        date: new Date().toISOString(),
        from: user.email,
        index,
        folder: "sent",
        deleted: false,
        encrypted,
        owner: user.email
    }

    await addDoc(collection(db, "emails"), newEmail);
    if (to === user.email){
        await addDoc(collection(db, "emails"), {...newEmail, folder: "inbox", index: newIndex += 1})
    } else {
        await addDoc(collection(db, "emails"), {...newEmail, folder: "inbox", owner: to, newIndex: index += 1});
    }
}

export async function sendEmailToTrash(index, user){
    const docQuery = query(collection(db, "emails"), where("index", "==", index))
    const querySnapshot = await getDocs(docQuery)

    for (const email of querySnapshot.docs){
        await updateDoc(doc(db, "emails", email.id), {
            deleted: true,
            folder: "trash",
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