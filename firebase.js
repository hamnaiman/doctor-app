import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAOk_Pcj3mZUaaCBpzGzWPh-rZr6Z1N0sk",
    authDomain: "doctor-app-6b25b.firebaseapp.com",
    projectId: "doctor-app-6b25b",
    storageBucket: "doctor-app-6b25b.firebasestorage.app",
    messagingSenderId: "636903787703",
    appId: "1:636903787703:web:d18816564b2f0c3da59132",
    measurementId: "G-B1YJQ99C5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign Up Function
let signUp = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let fullName = document.getElementById("full_name").value;
    let phone = document.getElementById("phone").value;
    let role = document.getElementById("role").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            
            setDoc(doc(db, "users", user.uid), {
                fullName: fullName,
                phone: phone,
                role: role
            });

           
            if (role === "doctor") {
                window.location.href = "doctor.html"; 
            } else {
                window.location.href = "patient.html"; 
            }
        })
        .catch((error) => {
            console.log(error.message);
        });
};

let signUpButton = document.getElementById("sign_up");
signUpButton.addEventListener("click", signUp);

// Sign In Function
let signIn = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);

            
            const userRef = doc(db, "users", user.uid);
            userRef.get().then((docSnap) => {
                if (docSnap.exists()) {
                    const role = docSnap.data().role;
                   
                    if (role === "doctor") {
                        window.location.href = "doctor.html"; 
                    } else {
                        window.location.href = "patient.html"; 
                    }
                }
            });
        })
        .catch((error) => {
            console.log(error.code);
        });
};

let signInButton = document.getElementById("sign_in");
signInButton.addEventListener("click", signIn);
