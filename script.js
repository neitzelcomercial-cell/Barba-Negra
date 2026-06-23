/* =============================================
   BARBA NEGRA LN — Scripts
   ============================================= */

// ---------- AGENDA: Envio via WhatsApp ----------
function agendar() {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const dataDesejada = document.getElementById('dataDesejada').value.trim();
    const servicos = document.getElementById('servicosMsg').value.trim();

    if (!nome || !telefone) {
        alert('Por favor, preencha seu nome e telefone.');
        return;
    }

    let mensagem = 'Olá! Gostaria de agendar um horário:%0A';
    mensagem += 'Nome: ' + nome + '%0A';
    mensagem += 'Telefone: ' + telefone + '%0A';

    if (dataDesejada) {
        mensagem += 'Data/Horário: ' + dataDesejada + '%0A';
    }

    if (servicos) {
        mensagem += 'Serviços: ' + servicos + '%0A';
    }

    const numero = '5547989052566';
    const url = 'https://wa.me/' + numero + '?text=' + mensagem;
    window.open(url, '_blank');
    return false;
}

// ---------- GALERIA ----------
const galeriaFotos = [
    { emoji: '◧', label: 'Espaço Barbearia' },
    { emoji: '◨', label: 'Estação de Corte' },
    { emoji: '◩', label: 'Ambiente' },
    { emoji: '◆', label: 'Degradê Navalhado' },
    { emoji: '■', label: 'Barba Cheia Modelada' },
    { emoji: '▲', label: 'Corte Social' },
    { emoji: '▼', label: 'Barba Desenhada' },
    { emoji: '◈', label: 'Corte Militar' },
    { emoji: '⬥', label: 'Barba & Bigode' }
];

function renderizarGaleria() {
    const grid = document.getElementById('galleryGrid');
    grid.innerHTML = galeriaFotos.map((f, i) =>
        '<div class="gallery-item" onclick="abrirModal(' + i + ')">' +
            '<div class="gallery-item__placeholder">' +
                '<span>' + f.emoji + '</span>' +
                '<span>' + f.label + '</span>' +
            '</div>' +
        '</div>'
    ).join('');
}

// ---------- MODAL ----------
function abrirModal(index) {
    const foto = galeriaFotos[index];
    const modal = document.getElementById('modal');
    const img = document.getElementById('modalImg');

    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 450;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createRadialGradient(300, 225, 50, 300, 225, 300);
    grad.addColorStop(0, '#1a3050');
    grad.addColorStop(1, '#0a0e17');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 600, 450);

    ctx.strokeStyle = '#C9A96E';
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 20, 560, 410);

    ctx.font = '120px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(foto.emoji, 300, 175);

    ctx.font = '600 26px Cinzel, serif';
    ctx.fillStyle = '#e8e6e1';
    ctx.fillText(foto.label, 300, 310);

    ctx.font = '14px Inter, sans-serif';
    ctx.fillStyle = '#b8b4ae';
    ctx.fillText('Barba Negra LN', 300, 360);

    img.src = canvas.toDataURL();
    img.alt = foto.label;
    modal.classList.add('modal--open');
}

function fecharModal() {
    document.getElementById('modal').classList.remove('modal--open');
}

document.getElementById('modal').addEventListener('click', function(e) {
    if (e.target === e.currentTarget) fecharModal();
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fecharModal();
});

// ---------- MENU MOBILE ----------
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', function() {
    nav.classList.toggle('nav--open');
});

document.querySelectorAll('.nav__link').forEach(function(link) {
    link.addEventListener('click', function() {
        nav.classList.remove('nav--open');
    });
});

// ---------- INICIALIZAÇÃO ----------
document.addEventListener('DOMContentLoaded', function() {
    renderizarGaleria();
});
