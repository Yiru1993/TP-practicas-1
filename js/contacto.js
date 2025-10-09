const form = document.getElementById("formContacto");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) { 
    event.preventDefault();

    Swal.fire({
        title: "¡Gracias por contactarnos!",
        text: "Nos pondremos en contacto contigo pronto",
        background: "#202528",
        color: "#D8DCE0",
        confirmButtonColor: "#DC3447",
    });

    form.reset();
}