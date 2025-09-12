const loginModal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const loginAcceptButton = document.getElementById('loginAcceptButton');
const cancelModalButton = document.getElementById('cancelModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const dynamicText = document.querySelector('.elementor-headline-dynamic-text');
const palabras = ["¿Terror?", "¿Comedia?", "¿Acción?", "¿Drama?", "¿Ciencia ficción?", "¿Suspenso?", "¿Aventura?", "¿Cine argentino?"];
let index = 0;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

loginModal.addEventListener('shown.bs.modal', () => {
    loginButton.focus();
})

loginAcceptButton.addEventListener('click', handleLogin);
cancelModalButton.addEventListener('click', cleanModal);
closeModalButton.addEventListener('click', cleanModal);

setInterval(() => {
  index = (index + 1) % palabras.length;
  dynamicText.style.opacity = 0;

  setTimeout(() => {
    dynamicText.textContent = palabras[index];
    dynamicText.style.opacity = 1;
  }, 500);
}, 2000);

function handleLogin() {
    let emailInput = document.getElementById('emailInput');
    if (emailRegex.test(emailInput.value)) {
        console.log("Email ok");
    } else {
        let invalidEmail = document.getElementById('invalid-email');
        invalidEmail.classList.toggle("invalid-feedback");
        invalidEmail.hidden=false;
        emailInput.classList.toggle("is-invalid");
    }

    let passwordInput = document.getElementById('passwordInput');
    if (passwordInput.value !== '') {
        console.log("Password ok");
    } else {
        let invalidPassword = document.getElementById('invalid-password');
        invalidPassword.classList.toggle("invalid-feedback");
        invalidPassword.hidden=false;
        passwordInput.classList.toggle("is-invalid");
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