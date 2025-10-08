const loginModal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const loginAcceptButton = document.getElementById('loginAcceptButton');
const cancelModalButton = document.getElementById('cancelModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const sessionToast = document.getElementById("toastSesion");
const buttonCloseSesion = document.getElementById("buttonCloseSesion");
const busqueda = document.getElementById('busqueda');
const formLogin = document.getElementById('formLogin');
const dynamicText = document.getElementById('carousel');
const stars = document.querySelectorAll('.star');
const palabras = ["¿Terror?", "¿Comedia?", "¿Acción?", "¿Drama?", "¿Ciencia ficción?", "¿Suspenso?", "¿Aventura?", "¿Cine argentino?"];
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
let index = 0;

// Seteo de eventos
formLogin.addEventListener('submit', handleLogin);
cancelModalButton.addEventListener('click', handleCleanModal);
closeModalButton.addEventListener('click', handleCleanModal);
buttonCloseSesion.addEventListener('click', handleDismissToast);
busqueda.addEventListener('input', handleSearch);
stars.forEach(star => {
    star.addEventListener('mouseover', handleStarMouseover);
    star.addEventListener('mouseout', handleStarMouseout);
    star.addEventListener('click', handleStarClick);
});

// Logica del carousel
setInterval(() => {
  index = (index + 1) % palabras.length;
  dynamicText.style.opacity = 0;

  setTimeout(() => {
    dynamicText.textContent = palabras[index];
    dynamicText.style.opacity = 1;
  }, 500);
}, 2000);

function handleStarMouseover(event) {
    let estrellas = event.target.parentNode.querySelectorAll('span');
    let valor = parseInt(event.target.getAttribute('data-value'));
    estrellas.forEach(s => {
        if (parseInt(s.getAttribute('data-value')) <= valor) {
            s.classList.add('selected');
        } else {
            s.classList.remove('selected');
        }
    });
}

function handleStarMouseout(event) {
    let estrellas = event.target.parentNode.querySelectorAll('span');
    estrellas.forEach(s => s.classList.remove('selected'));
}

function handleStarClick(event) {
    let estrellas = event.target.parentNode.querySelectorAll('span');
    let valor = parseInt(event.target.getAttribute('data-value'));
    estrellas.forEach(s => {
        s.removeEventListener('mouseover', handleStarMouseover);
        s.removeEventListener('mouseout', handleStarMouseout);
        s.removeEventListener('click', handleStarClick);
        if (parseInt(s.getAttribute('data-value')) <= valor) {
            s.classList.add('selected');
        } else {
            s.classList.remove('selected');
        }
    });
}

function handleLogin(event) {
    event.preventDefault();
    let validation = true;

    let emailInput = document.getElementById('emailInput');
    let invalidEmail = document.getElementById('invalid-email');
    if (!emailRegex.test(emailInput.value)) {
        invalidEmail.hidden=false;
        emailInput.classList.add("is-invalid");
        validation = false;
    } else {
        invalidEmail.hidden=true;
        emailInput.classList.remove("is-invalid");
    }

    let passwordInput = document.getElementById('passwordInput');
    let invalidPassword = document.getElementById('invalid-password');
    if (passwordInput.value.trim() === '') {
        invalidPassword.hidden=false;
        passwordInput.classList.add("is-invalid");
        validation = false;
    } else {
        invalidPassword.hidden=true;
        passwordInput.classList.remove("is-invalid");
    }

    if (validation) {
        let password = localStorage.getItem(emailInput.value);
        if (password === passwordInput.value) {
            cleanModal();
            let modal = bootstrap.Modal.getInstance(loginModal)
            modal.hide();
            sessionToast.hidden = false;
        } else {
            invalidPassword.classList.add("invalid-feedback");
            invalidPassword.hidden = false;
            passwordInput.classList.add("is-invalid");
            validation = false;
        }
    }
    return false;
}

function handleCleanModal() {
    cleanModal();
}

function cleanModal() {
    let emailInput = document.getElementById('emailInput');
    emailInput.classList.remove("is-invalid");
    emailInput.value = "";
    let invalidEmail = document.getElementById('invalid-email');
    invalidEmail.classList.remove("invalid-feedback");
    invalidEmail.hidden = true;

    let passwordInput = document.getElementById('passwordInput');
    passwordInput.classList.remove("is-invalid");
    passwordInput.value = "";
    let invalidPassword = document.getElementById('invalid-password');
    invalidPassword.classList.remove("invalid-feedback");
    invalidPassword.hidden = true;
}

function handleDismissToast() {
    sessionToast.hidden = true;
}

function handleSearch(event) {
    event.preventDefault();
    let peliculas = document.querySelectorAll('.card-title');
    peliculas.forEach(p => {
        if (p.innerHTML.toLowerCase().includes(event.target.value.toLowerCase())) {
            p.parentElement.parentElement.parentElement.hidden = false;
        } else {
            p.parentElement.parentElement.parentElement.hidden = true;
        }
    });
}