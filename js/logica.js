const loginModal = document.getElementById('loginModal')
const loginButton = document.getElementById('loginButton')
const palabras = ["¿Terror?", "¿Comedia?", "¿Acción?", "¿Drama?", "¿Ciencia ficción?", "¿Suspenso?", "¿Aventura?", "¿Cine argentino?"];
let index = 0;


loginModal.addEventListener('shown.bs.modal', () => {
    loginButton.focus()
})

const dynamicText = document.querySelector('.elementor-headline-dynamic-text');

setInterval(() => {
  index = (index + 1) % palabras.length;
  dynamicText.style.opacity = 0;

  setTimeout(() => {
    dynamicText.textContent = palabras[index];
    dynamicText.style.opacity = 1;
  }, 500);
}, 2000);
