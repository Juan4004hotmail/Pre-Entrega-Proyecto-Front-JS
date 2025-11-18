// === Desplegar sinopsis ===
document.querySelectorAll('.ver-mas-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const sinopsis = btn.parentElement.querySelector('.sinopsis');
    sinopsis.classList.toggle('oculto');
    btn.textContent = sinopsis.classList.contains('oculto') ? 'Ver +' : 'Ver -';
  });
});


// === Estrellas interactivas ===
document.querySelectorAll('.fila-libro').forEach(libro => {
  const stars = libro.querySelectorAll('.star');
  const modal = libro.querySelector('.modal-reseña');
  
  stars.forEach(star => {
    // Hover visual
    star.addEventListener('mouseover', () => {
      const value = star.dataset.value;
      stars.forEach(s => {
        s.classList.toggle('hovered', s.dataset.value <= value);
      });
    });

    // Quitar hover al salir
    star.addEventListener('mouseout', () => {
      stars.forEach(s => s.classList.remove('hovered'));
    });

    // Clic → abrir modal
    star.addEventListener('click', () => {
      stars.forEach(s => {
        s.classList.toggle('selected', s.dataset.value <= star.dataset.value);
      });
      modal.classList.remove('oculto');
      modal.dataset.rating = star.dataset.value;
    });
  });

  // Cerrar modal
  libro.querySelector('.cerrar-modal-btn').addEventListener('click', () => {
    modal.classList.add('oculto');
  });

  // Publicar reseña → crear nueva card
  libro.querySelector('.publicar-reseña-btn').addEventListener('click', () => {
    const nombre = modal.querySelector('.input-nombre').value;
    const opinion = modal.querySelector('.input-opinion').value;
    const rating = modal.dataset.rating;

    if (!nombre || !opinion) {
      alert("Por favor completa todos los campos.");
      return;
    }

    agregarReseña(nombre, opinion, rating);
    modal.classList.add('oculto');
    modal.querySelector('.input-nombre').value = '';
    modal.querySelector('.input-opinion').value = '';
  });
});


// === Función que crea la nueva card en la sección Reseñas ===
function agregarReseña(nombre, opinion, rating) {
  const container = document.querySelector('.reseña-container');

  const card = document.createElement('div');
  card.classList.add('reseña-card');

  // Estrellas pintadas
  let estrellas = '';
  for (let i=1; i<=5; i++) {
    estrellas += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
  }

  card.innerHTML = `
    <h3>${nombre}</h3>
    <div class="reseña-estrellas">${estrellas}</div>
    <p>${opinion}</p>
  `;

  container.appendChild(card);
}