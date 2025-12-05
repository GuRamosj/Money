function consultar() {
  const cpf = document.getElementById('cpf').value.trim();

  if (!cpf) {
    alert("Digite seu CPF ou CNPJ");
    return;
  }

  // MENSAGEM AUTOMÁTICA DO WHATSAPP
  const mensagem = `Olá! Gostaria de solicitar atendimento. Meu CPF/CNPJ é: ${cpf}`;

  // COLOQUE SEU NÚMERO AQUI 👇 (no formato 55 + DDD + número)
  const numero = "5599999999999";

  const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

  window.location.href = link;
}

/* === SLIDER PROFISSIONAL === */

const slidesContainer = document.getElementById("slides");
const slides = document.querySelectorAll("#slides img");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("dots");

let index = 0;

/* Criar dots automaticamente */
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.dataset.index = i;
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

/* Atualizar slider */
function updateSlider() {
  slidesContainer.style.transform = `translateX(${-index * 100}%)`;
  document.querySelectorAll(".dots span").forEach(dot => {
    dot.classList.remove("active");
  });
  document.querySelector(`.dots span[data-index="${index}"]`).classList.add("active");
}

/* Botões */
prevBtn.onclick = () => {
  index = (index === 0) ? slides.length - 1 : index - 1;
  updateSlider();
};

nextBtn.onclick = () => {
  index = (index + 1) % slides.length;
  updateSlider();
};

/* Clique nos dots */
dotsContainer.onclick = e => {
  if (e.target.tagName === "SPAN") {
    index = Number(e.target.dataset.index);
    updateSlider();
  }
};

/* === MOBILE TOUCH (SWIPE) === */
let startX = 0;

slidesContainer.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

slidesContainer.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (diff > 50) {
    // Swipe esquerda → próximo
    index = (index + 1) % slides.length;
    updateSlider();
  }

  if (diff < -50) {
    // Swipe direita → anterior
    index = (index === 0) ? slides.length - 1 : index - 1;
    updateSlider();
  }
});
