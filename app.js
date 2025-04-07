const auth = firebase.auth();
const db = firebase.database();

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password)
    .then(() => location.href = "flashcards.html")
    .catch(err => alert(err.message));
}

function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => alert("Signup successful!"))
    .catch(err => alert(err.message));
}

function logout() {
  auth.signOut().then(() => location.href = "index.html");
}

auth.onAuthStateChanged(user => {
  if (user && location.pathname.includes("flashcards.html")) {
    loadFlashcards(user.uid);
  }
});

function addFlashcard() {
  const user = auth.currentUser;
  const question = document.getElementById("question").value;
  const answer = document.getElementById("answer").value;

  if (user && question && answer) {
    db.ref("flashcards/" + user.uid).push({
      question, answer
    });
    document.getElementById("question").value = "";
    document.getElementById("answer").value = "";
  }
}

function loadFlashcards(uid) {
  const container = document.getElementById("flashcards");
  db.ref("flashcards/" + uid).on("value", snapshot => {
    container.innerHTML = "";
    snapshot.forEach(child => {
      const card = child.val();
      const div = document.createElement("div");
      div.innerHTML = `<strong>Q:</strong> ${card.question}<br><strong>A:</strong> ${card.answer}`;
      container.appendChild(div);
    });
  });
}

function showSignup() {
  document.getElementById("signup").style.display = "block";
}
