
let flashcards = [];

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('flashcard-form').style.display = 'block';
    })
    .catch(error => alert(error.message));
}

function signup() {
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;

  auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      document.getElementById('flashcard-form').style.display = 'block';
    })
    .catch(error => alert(error.message));
}

function showSignup() {
  document.getElementById('signup').style.display = 'block';
}

function addFlashcard() {
  const question = document.getElementById('flashcard-question').value;
  const answer = document.getElementById('flashcard-answer').value;
  const imageFile = document.getElementById('flashcard-image').files[0];

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageUrl = e.target.result;
    const card = { question, answer, imageUrl };
    flashcards.push(card);
    renderFlashcards();
  };
  if (imageFile) {
    reader.readAsDataURL(imageFile);
  } else {
    const card = { question, answer, imageUrl: null };
    flashcards.push(card);
    renderFlashcards();
  }

  document.getElementById('flashcard-question').value = '';
  document.getElementById('flashcard-answer').value = '';
  document.getElementById('flashcard-image').value = '';
}

function renderFlashcards() {
  const container = document.getElementById('flashcards-preview');
  container.innerHTML = '';
  flashcards.forEach(card => {
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = \`
      <strong>Q:</strong> \${card.question} <br>
      <strong>A:</strong> \${card.answer} <br>
      \${card.imageUrl ? \`<img src="\${card.imageUrl}" style="width:100px;">\` : ''}
      <hr>
    \`;
    container.appendChild(cardDiv);
  });
}

async function exportPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  for (let i = 0; i < flashcards.length; i++) {
    const { question, answer, imageUrl } = flashcards[i];
    doc.text(\`Q: \${question}\`, 10, 10 + i * 50);
    doc.text(\`A: \${answer}\`, 10, 20 + i * 50);

    if (imageUrl) {
      const img = new Image();
      img.src = imageUrl;
      await new Promise(resolve => {
        img.onload = () => {
          doc.addImage(img, 'JPEG', 10, 30 + i * 50, 50, 30);
          resolve();
        };
      });
    }

    if (i < flashcards.length - 1) doc.addPage();
  }

  doc.save('flashcards.pdf');
}
