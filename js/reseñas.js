
const formReseña = document.getElementById('formReseña');
const listaReseñas = document.getElementById('listaReseñas');

formReseña.addEventListener('submit', handleCrearReseña);

function handleCrearReseña(event) {
    event.preventDefault();

    let nombre = document.getElementById('nombreReseña').value.trim();
    let pelicula = document.getElementById('peliculaReseña').value.trim();
    let opinion = document.getElementById('opinionReseña').value.trim();

    if (!nombre || !pelicula || !opinion) return;
    let reseñas = JSON.parse(localStorage.getItem('reseñas') || '[]');
    reseñas.unshift({ nombre, pelicula, opinion });
    localStorage.setItem('reseñas', JSON.stringify(reseñas));
    formReseña.reset();
    mostrarReseñas();
}

function mostrarReseñas() {
    listaReseñas.innerHTML = '';
    const reseñas = JSON.parse(localStorage.getItem('reseñas') || '[]');
    if (reseñas.length === 0) {
        listaReseñas.innerHTML = '<p class="text-muted">Aún no hay reseñas.</p>';
        return;
    }
    reseñas.forEach(r => {
        const div = document.createElement('div');
        div.className = 'card mb-2';
        div.innerHTML = `<div class='card-body'>
            <h5 class='card-title mb-1'>${r.pelicula}</h5>
            <h6 class='card-subtitle mb-2 text-muted'>${r.nombre}</h6>
            <p class='card-text'>${r.opinion}</p>
        </div>`;
        listaReseñas.appendChild(div);
    });
}

mostrarReseñas();