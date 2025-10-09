const submitButton = document.getElementById('submitButton');
const nombreInputRegistro = document.getElementById('nombreInputRegistro');
const direccionInputRegistro = document.getElementById('direccionInputRegistro');
const telInputRegistro = document.getElementById('telInputRegistro');
const emailInputRegistro = document.getElementById('emailInputRegistro');
const passwordInputRegistro = document.getElementById('passwordInputRegistro');
const registryToast = document.getElementById("toastRegistro");
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;

submitButton.addEventListener('click', handleSubmit);

function handleSubmit() {
    if (validateInputs()) {
        let email = emailInputRegistro.value;
        let nombre = nombreInputRegistro.value;
        let password = passwordInputRegistro.value;
        let userData = { nombre, password };
        localStorage.setItem(email, JSON.stringify(userData));
        registryToast.hidden = false;
        setTimeout(function() {
            location.href = "../index.html";
        }, 3000)
        // TODO Contemplar caso de user existente
    }
}

function validateInputs() {
    let validation = true;

    // Nombre
    let invalidNombre = document.getElementById('invalid-nombre-registro');
    if (nombreInputRegistro.value.trim() === "") {
        invalidNombre.classList.add("invalid-feedback");
        invalidNombre.hidden = false;
        nombreInputRegistro.classList.add("is-invalid");
        validation = false;
    } else {
        invalidNombre.classList.remove("invalid-feedback");
        invalidNombre.hidden = true;
        nombreInputRegistro.classList.remove("is-invalid");
    }

    // Direccion
    let invalidDireccion = document.getElementById('invalid-direccion-registro');
    if (direccionInputRegistro.value.trim() === "") {
        invalidDireccion.classList.add("invalid-feedback");
        invalidDireccion.hidden = false;
        direccionInputRegistro.classList.add("is-invalid");
        validation = false;
    } else {
        invalidDireccion.classList.remove("invalid-feedback");
        invalidDireccion.hidden = true;
        direccionInputRegistro.classList.remove("is-invalid");
    }

    // Telefono
    let invalidTel = document.getElementById('invalid-tel-registro');
    if (telInputRegistro.value.trim() === "") {
        invalidTel.classList.add("invalid-feedback");
        invalidTel.hidden = false;
        telInputRegistro.classList.add("is-invalid");
        validation = false;
    } else {
        invalidTel.classList.remove("invalid-feedback");
        invalidTel.hidden = true;
        telInputRegistro.classList.remove("is-invalid");
    }

    // Email
    let invalidEmail = document.getElementById('invalid-email-registro');
    if (!emailRegex.test(emailInputRegistro.value)) {
        invalidEmail.classList.add("invalid-feedback");
        invalidEmail.hidden = false;
        emailInputRegistro.classList.add("is-invalid");
        validation = false;
    } else {
        invalidEmail.classList.remove("invalid-feedback");
        invalidEmail.hidden = true;
        emailInputRegistro.classList.remove("is-invalid");
    }

    // Contraseña
    let invalidPassword = document.getElementById('invalid-password-registro');
    if (!passwordRegex.test(passwordInputRegistro.value)) {
        invalidPassword.classList.add("invalid-feedback");
        invalidPassword.hidden = false;
        passwordInputRegistro.classList.add("is-invalid");
        validation = false;
    } else {
        invalidPassword.classList.remove("invalid-feedback");
        invalidPassword.hidden = true;
        passwordInputRegistro.classList.remove("is-invalid");
    }

    return validation;
}