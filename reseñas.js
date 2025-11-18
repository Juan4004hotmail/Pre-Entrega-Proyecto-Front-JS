// reseñas.js
// Ejemplo simple: reseñas estáticas; más adelante podes cargarlas desde un JSON o API

const reseñas = [
  {
    id: 1,
    autor: "Natu P.",
    rating: 5,
    texto: "Maravillosa selección. Encontré ediciones raras y la atención fue excelente. Volveré siempre.",
    likes: 12,
    libro: "La Sombra de los Dioses"
  },
  {
    id: 2,
    autor: "Laura F.",
    rating: 4,
    texto: "Buen surtido de fantasía y precios razonables. El envío fue rápido.",
    likes: 7,
    libro: "Deja en Paz al Diablo"
  },
  {
    id: 3,
    autor: "Martín G.",
    rating: 5,
    texto: "Siento que cada compra es una pequeña aventura. Recomendados especialmente para quienes aman la mitología.",
    likes: 21,
    libro: "De Sangre y Cenizas"
  }
];

// Función que crea la card HTML y la devuelve
function crearReseñaCard(reseña) {
  const cont = document.createElement("div");
  cont.className = "reseña-inner";
  cont.innerHTML = `
    <div class="reseña-info">
      <p class="autor">${escapeHtml(reseña.autor)}</p>
      <p class="meta">${escapeHtml(reseña.libro)} • <span class="reseña-estrellas">${renderStars(reseña.rating)}</span></p>
      <p class="reseña-texto">${escapeHtml(reseña.texto)}</p>
    </div>
    <div class="reseña-controles">
      <button class="like-btn" data-id="${reseña.id}" aria-label="Me gusta reseña ${reseña.id}">❤ Me gusta</button>
      <div class="like-count" id="likes-${reseña.id}">${reseña.likes}</div>
    </div>
  `;
  return cont;
}

function renderStars(n) {
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += `<span class="star ${i <= n ? "filled" : ""}">★</span>`;
  }
  return stars;
}

// Escapar texto (para seguridad XSS si en el futuro llega del usuario)
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Muestra una reseña aleatoria en el contenedor
function mostrarReseñaAleatoria() {
  const contenedor = document.getElementById("reseña-card");
  if (!contenedor) return;
  contenedor.innerHTML = ""; // limpia
  const idx = Math.floor(Math.random() * reseñas.length);
  const reseña = reseñas[idx];
  const card = crearReseñaCard(reseña);
  contenedor.appendChild(card);

  // Listener para el like de la card actual
  const likeBtn = card.querySelector(".like-btn");
  likeBtn.addEventListener("click", () => {
    reseña.likes += 1;
    const contador = document.getElementById(`likes-${reseña.id}`);
    if (contador) contador.textContent = reseña.likes;
    // Animación sutil
    likeBtn.animate([{ transform: "scale(1)" }, { transform: "scale(1.08)" }, { transform: "scale(1)" }], { duration: 200 });
  });
}

// Botón para mostrar otra reseña
document.addEventListener("DOMContentLoaded", () => {
  mostrarReseñaAleatoria();

  const otraBtn = document.getElementById("otra-reseña");
  if (otraBtn) {
    otraBtn.addEventListener("click", mostrarReseñaAleatoria);
  }
});