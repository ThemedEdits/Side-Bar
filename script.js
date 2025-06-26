// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// ✅ Replace with your own Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyD3Ls5jl0rPHGdlQakRM5KIwQK0Iv05-ts",
    authDomain: "login-signup-26107.firebaseapp.com",
    projectId: "login-signup-26107",
    storageBucket: "login-signup-26107.firebasestorage.app",
    messagingSenderId: "452168801142",
    appId: "1:452168801142:web:dccf6a02f61ed64372f857"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Email/Password Login
window.login = function () {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
};

// Google Login
window.googleLogin = function () {
  signInWithPopup(auth, provider)
    .then(() => {
      window.location.href = "home.html";
    })
    .catch((error) => {
      alert("Google Sign-In failed: " + error.message);
    });
};


import {
  createUserWithEmailAndPassword,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// Email/Password Sign-Up
// Sign-Up Function with Name
window.signup = function () {
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // 🟡 Save display name to profile
      updateProfile(user, {
        displayName: name,
      }).then(() => {
        alert("Signup successful!");
        window.location.href = "home.html";
      });
    })
    .catch((error) => {
      alert("Signup failed: " + error.message);
    });
};


// Logout function
window.logout = function () {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
};

// Auth check on home.html
if (window.location.pathname.includes("home.html")) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // Elements
      const userName = document.getElementById("user-name");
      const userEmail = document.getElementById("user-email");
      const welcomeName = document.getElementById("welcome-name");
      const userAvatar = document.getElementById("user-avatar");

      const name = user.displayName || "User";

      if (userName) userName.textContent = name;
      if (welcomeName) welcomeName.textContent = name;
      if (userEmail) userEmail.textContent = user.email;
      if (userAvatar)
        userAvatar.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          name
        )}&background=random`;

    } else {
      window.location.href = "index.html"; // Not logged in
    }
  });
}



document.addEventListener('DOMContentLoaded', () => {
  const toggleIcon = document.querySelector('.password-toggle');
  if (toggleIcon) {
    toggleIcon.addEventListener('click', togglePassword);
  }
});

function togglePassword(event) {
  // Get the clicked eye icon
  const toggleIcon = event.currentTarget;
  
  // Find the closest input group and then the password input within it
  const inputGroup = toggleIcon.closest('.input-group');
  const passwordInput = inputGroup ? inputGroup.querySelector('input[type="password"], input[type="text"]') : null;
  
  if (!passwordInput) return;
  
  // Toggle the password visibility
  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    toggleIcon.classList.replace('fa-eye', 'fa-eye-slash');
  } else {
    passwordInput.type = 'password';
    toggleIcon.classList.replace('fa-eye-slash', 'fa-eye');
  }
}

// Add event listeners to all toggle buttons
document.addEventListener('DOMContentLoaded', () => {
  const toggleButtons = document.querySelectorAll('.password-toggle');
  toggleButtons.forEach(button => {
    button.addEventListener('click', togglePassword);
  });
});