const loginModal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const loginAcceptButton = document.getElementById('loginAcceptButton');
const cancelModalButton = document.getElementById('cancelModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const dynamicText = document.querySelector('.elementor-headline-dynamic-text');
const generoSpan = document.getElementById('genero-animado');

// Carrusel de preguntas/frases
const frases = [
  "¿Terror?", "¿Comedia?", "¿Acción?", "¿Drama?", "¿Ciencia ficción?", "¿Suspenso?", "¿Aventura?", "¿Cine argentino?"
];
let fraseIndex = 0;
setInterval(() => {
  fraseIndex = (fraseIndex + 1) % frases.length;
  dynamicText.style.opacity = 0;
  setTimeout(() => {
    dynamicText.textContent = frases[fraseIndex];
    dynamicText.style.opacity = 1;
  }, 500);
}, 2000);

// Carrusel de géneros
const generos = [
  "Acción", "Aventura", "Comedia", "Drama", "Terror", "Suspenso",
  "Ciencia ficción", "Fantasía", "Romance", "Musical", "Animación",
  "Documental", "Crimen", "Bélico", "Western"
];
let generoIndex = 0;
setInterval(() => {
  generoIndex = (generoIndex + 1) % generos.length;
  generoSpan.style.opacity = 0;
  setTimeout(() => {
    generoSpan.textContent = generos[generoIndex];
    generoSpan.style.opacity = 1;
  }, 500);
}, 1500);

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

loginAcceptButton.addEventListener('click', handleLogin);
cancelModalButton.addEventListener('click', cleanModal);
closeModalButton.addEventListener('click', cleanModal);

function handleLogin() {
    let validation = true;

    let emailInput = document.getElementById('emailInput');
    let invalidEmail = document.getElementById('invalid-email');
    if (!emailRegex.test(emailInput.value)) {
        invalidEmail.classList.add("invalid-feedback");
        invalidEmail.hidden=false;
        emailInput.classList.add("is-invalid");
        validation = false;
    } else {
        invalidEmail.classList.remove("invalid-feedback");
        invalidEmail.hidden=true;
        emailInput.classList.remove("is-invalid");
    }

    let passwordInput = document.getElementById('passwordInput');
    let invalidPassword = document.getElementById('invalid-password');
    if (passwordInput.value === '') {
        invalidPassword.classList.add("invalid-feedback");
        invalidPassword.hidden=false;
        passwordInput.classList.add("is-invalid");
        validation = false;
    } else {
        invalidPassword.classList.remove("invalid-feedback");
        invalidPassword.hidden=true;
        passwordInput.classList.remove("is-invalid");
    }

    if (validation) {
        let password = localStorage.getItem(emailInput.value);
        if (password === passwordInput.value) {
            console.log("Login OK");
            cleanModal();
            // TODO no se cierra el modal
            // TODO agregar mensaje de accion exitosa
        } else {
            console.log("Login ERROR");
        }
    }

}

function cleanModal() {
    let emailInput = document.getElementById('emailInput');
    emailInput.classList.remove("is-invalid");
    emailInput.value = "";
    let invalidEmail = document.getElementById('invalid-email');
    invalidEmail.classList.remove("invalid-feedback");
    invalidEmail.hidden=true;

    let passwordInput = document.getElementById('passwordInput');
    passwordInput.classList.remove("is-invalid");
    passwordInput.value = "";
    let invalidPassword = document.getElementById('invalid-password');
    invalidPassword.classList.remove("invalid-feedback");
    invalidPassword.hidden=true;
}