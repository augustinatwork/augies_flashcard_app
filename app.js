function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Logged in successfully!");
      // Redirect to flashcards page (you can replace this)
      window.location.href = "flashcards.html";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Signup successful! Please log in.");
      document.getElementById("signup").style.display = "none";
    })
    .catch((error) => {
      alert(error.message);
    });
}

function showSignup() {
  document.getElementById("signup").style.display = "block";
}
