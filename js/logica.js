const loginModal = document.getElementById('loginModal');
const loginButton = document.getElementById('loginButton');
const loginAcceptButton = document.getElementById('loginAcceptButton');
const cancelModalButton = document.getElementById('cancelModalButton');
const closeModalButton = document.getElementById('closeModalButton');
const sessionToast = document.getElementById("toastSesion");
const buttonCloseSesion = document.getElementById("buttonCloseSesion");
const busqueda = document.getElementById('busqueda');
const grilla = document.getElementById('grilla');
const dynamicText = document.querySelector('.elementor-headline-dynamic-text');
const palabras = ["¿Terror?", "¿Comedia?", "¿Acción?", "¿Drama?", "¿Ciencia ficción?", "¿Suspenso?", "¿Aventura?", "¿Cine argentino?"];
let index = 0;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


loginAcceptButton.addEventListener('click', handleLogin);
cancelModalButton.addEventListener('click', cleanModal);
closeModalButton.addEventListener('click', cleanModal);
buttonCloseSesion.addEventListener('click', dismissSessionToast);
busqueda.addEventListener('input', handleSearch);

setInterval(() => {
  index = (index + 1) % palabras.length;
  dynamicText.style.opacity = 0;

  setTimeout(() => {
    dynamicText.textContent = palabras[index];
    dynamicText.style.opacity = 1;
  }, 500);
}, 2000);

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
    if (passwordInput.value.trim() === '') {
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
            let modal = bootstrap.Modal.getInstance(loginModal)
            modal.hide();
            sessionToast.hidden = false;
        } else {
            console.log("Login ERROR");
            invalidPassword.classList.add("invalid-feedback");
            invalidPassword.hidden = false;
            passwordInput.classList.add("is-invalid");
            validation = false;
        }
    }

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

function dismissSessionToast() {
    sessionToast.hidden = true;
}

function handleSearch(e) {
    e.preventDefault();
    let peliculas = document.querySelectorAll('.card-title');
    peliculas.forEach(p => {
        if (p.innerHTML.toLowerCase().includes(e.target.value.toLowerCase())) {
            p.parentElement.parentElement.parentElement.hidden = false;
        } else {
            p.parentElement.parentElement.parentElement.hidden = true;
        }
    });
}

// Lógica de puntuación de estrellas
document.querySelectorAll('.star-rating').forEach(rating => {
    const stars = rating.querySelectorAll('.star');
    stars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const val = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= val) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
        star.addEventListener('mouseout', function() {
            stars.forEach(s => s.classList.remove('selected'));
        });
        star.addEventListener('click', function() {
            const val = parseInt(this.getAttribute('data-value'));
            stars.forEach(s => {
                if (parseInt(s.getAttribute('data-value')) <= val) {
                    s.classList.add('selected');
                } else {
                    s.classList.remove('selected');
                }
            });
        });
    });
});