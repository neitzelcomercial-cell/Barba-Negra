/* =============================================
   BARBA NEGRA LN — Scripts
   ============================================= */

// ---------- SERVIÇOS: Seleção com soma ----------
const servicosSelecionados = new Map();

function selectService(card) {
    const nome = card.dataset.service;
    const price = card.dataset.price;

    // Pacote Mensal não tem preço fixo — apenas toggle visual
    if (price === 'Consulte') {
        card.classList.toggle('service-card--selected');
        return;
    }

    const precoNumerico = parseFloat(price.replace('R$ ', '').replace(',', '.'));
    const isSelected = card.classList.toggle('service-card--selected');

    if (isSelected) {
        servicosSelecionados.set(nome, precoNumerico);
    } else {
        servicosSelecionados.delete(nome);
    }

    atualizarResumoServicos();
}

function atualizarResumoServicos() {
    const count = servicosSelecionados.size;
    document.getElementById('selectedCount').textContent = count;

    let total = 0;
    let nomes = [];
    for (const [nome, preco] of servicosSelecionados) {
        total += preco;
        nomes.push(nome);
    }
    document.getElementById('selectedTotal').textContent =
        'R$ ' + total.toFixed(2).replace('.', ',');

    document.getElementById('servicosSelecionados').value =
        count > 0 ? nomes.join(', ') + ' — Total: R$ ' + total.toFixed(2).replace('.', ',') : '';
}

// ---------- AGENDA: Envio via WhatsApp ----------
function agendar() {
    const nome = document.getElementById('nome').value.trim();
    const telefone = document.getElementById('telefone').value.trim();
    const dia = document.getElementById('dia').value;
    const horario = document.getElementById('horario').value;
    const servicos = document.getElementById('servicosSelecionados').value;

    if (!nome || !telefone || !dia || !horario) {
        alert('Por favor, preencha todos os campos do agendamento.');
        return;
    }

    const diasSemana = {
        segunda: 'Segunda-feira',
        terca: 'Terça-feira',
        quarta: 'Quarta-feira',
        quinta: 'Quinta-feira',
        sexta: 'Sexta-feira',
        sabado: 'Sábado'
    };

    let mensagem = 'Olá! Gostaria de agendar um horário:%0A';
    mensagem += 'Nome: ' + nome + '%0A';
    mensagem += 'Telefone: ' + telefone + '%0A';
    mensagem += 'Dia: ' + (diasSemana[dia] || dia) + '%0A';
    mensagem += 'Horário: ' + horario + '%0A';

    if (servicos) {
        mensagem += 'Serviços: ' + servicos + '%0A';
    }

    // NÚMERO DO WHATSAPP — ALTERE AQUI
    const numero = '5511999999999';
    const url = 'https://wa.me/' + numero + '?text=' + mensagem;
    window.open(url, '_blank');
}

// ---------- VERIFICAR HORÁRIOS DISPONÍVEIS ----------
function verificarHorarios() {
    const numero = '5511999999999'; // ALTERE AQUI
    const mensagem = 'Olá! Gostaria de saber quais horários estão disponíveis para esta semana.';
    window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem), '_blank');
}

// ---------- PRODUTOS: Compra via WhatsApp ----------
function comprar(produto) {
    const numero = '5511999999999'; // ALTERE AQUI
    const mensagem = 'Olá! Tenho interesse no produto: ' + produto;
    window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(mensagem), '_blank');
}

// ---------- GALERIA ----------
const galeriaFotos = [
    // 3 primeiras = espaço da barbearia
    { emoji: '◧', label: 'Espaço Barbearia', tipo: 'espaço' },
    { emoji: '◨', label: 'Estação de Corte', tipo: 'espaço' },
    { emoji: '◩', label: 'Ambiente', tipo: 'espaço' },
    // demais = cabelos e barbas
    { emoji: '◆', label: 'Degradê Navalhado', tipo: 'trabalho' },
    { emoji: '■', label: 'Barba Cheia Modelada', tipo: 'trabalho' },
    { emoji: '▲', label: 'Corte Social', tipo: 'trabalho' },
    { emoji: '▼', label: 'Barba Desenhada', tipo: 'trabalho' },
    { emoji: '◈', label: 'Corte Militar', tipo: 'trabalho' },
    { emoji: '⬥', label: 'Barba & Bigode', tipo: 'trabalho' }
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
