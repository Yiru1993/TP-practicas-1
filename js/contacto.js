const form = document.getElementById("formContacto");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) { 
    event.preventDefault();

    alert("Gracias por contactarnos. Nos pondremos en contacto contigo pronto.");
}


