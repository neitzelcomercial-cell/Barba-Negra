/* =============================================
   BARBA NEGRA LN — UI/UX Interativo
   Scroll Reveal, Slide Menu, Galeria com Navegação
   ============================================= */

// =============================================
// SCROLL REVEAL
// =============================================
function initScrollReveal() {
    const elements = document.querySelectorAll(
        '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach((el) => observer.observe(el));
}

// =============================================
// HEADER SCROLL EFFECT
// =============================================
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }, { passive: true });
}

// =============================================
// MOBILE MENU
// =============================================
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('nav');
    if (!hamburger || !nav) return;

    // Criar overlay
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !nav.classList.contains('nav--open');
        nav.classList.toggle('nav--open', isOpen);
        hamburger.classList.toggle('active', isOpen);
        overlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    hamburger.addEventListener('click', () => toggleMenu());

    overlay.addEventListener('click', () => toggleMenu(false));

    // Fechar ao clicar em link
    document.querySelectorAll('.nav__link').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(false));
    });

    // Fechar com Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('nav--open')) {
            toggleMenu(false);
        }
    });
}

// =============================================
// SCROLL SPY — destaca link ativo no nav
// =============================================
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px 0px 0px'
    });

    sections.forEach((section) => observer.observe(section));
}

// =============================================
// AGENDA via WhatsApp
// =============================================
function initAgenda() {
    const agendaBtn = document.getElementById('btnAgendar');
    if (!agendaBtn) return;

    window.agendar = function () {
        const nome = document.getElementById('nome').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const dataDesejada = document.getElementById('dataDesejada').value.trim();
        const servicos = document.getElementById('servicosMsg').value.trim();

        if (!nome || !telefone) {
            mostrarToast('Por favor, preencha seu nome e telefone.', 'warning');
            return false;
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

        const numero = '554791768615';
        const url = 'https://wa.me/' + numero + '?text=' + mensagem;
        window.open(url, '_blank');
        return false;
    };

    agendaBtn.addEventListener('click', function (e) {
        e.preventDefault();
        agendar();
    });
}

// =============================================
// TOAST NOTIFICATION
// =============================================
function mostrarToast(mensagem, tipo) {
    // Remove toast anterior se existir
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'alert');

    const icons = {
        warning: '⚡',
        success: '✓',
        info: '◆'
    };

    toast.innerHTML = `
        <span class="toast__icon">${icons[tipo] || icons.info}</span>
        <span class="toast__msg">${mensagem}</span>
    `;

    // Estilos inline para o toast (não poluir o CSS principal)
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '90px',
        left: '50%',
        transform: 'translateX(-50%) translateY(20px)',
        background: 'rgba(10, 14, 23, 0.9)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(201, 169, 110, 0.15)',
        borderRadius: '12px',
        padding: '14px 24px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        color: '#eeede9',
        fontSize: '0.88rem',
        fontFamily: 'Inter, sans-serif',
        zIndex: '3000',
        opacity: '0',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
        maxWidth: '90vw',
        whiteSpace: 'nowrap'
    });

    if (tipo === 'warning') {
        toast.style.borderColor = 'rgba(201, 169, 110, 0.3)';
        toast.querySelector('.toast__icon').style.color = '#C9A96E';
    }

    document.body.appendChild(toast);

    // Animação de entrada
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    // Auto-remover
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// =============================================
// GALERIA com navegação
// =============================================
const galeriaFotos = [
    { src: 'assets/espaco-barbearia.jpeg', label: 'Espaço Barbearia' }
];

let modalIndex = 0;

function renderizarGaleria() {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = galeriaFotos.map((f, i) => {
        if (f.src) {
            return '<div class="gallery-item reveal-scale" onclick="abrirModal(' + i + ')">' +
                '<img src="' + f.src + '" alt="' + f.label + '" class="gallery-item__img" />' +
                '<div class="gallery-item__overlay">' +
                    '<span>' + f.label + '</span>' +
                '</div>' +
            '</div>';
        }
        return '<div class="gallery-item reveal-scale" onclick="abrirModal(' + i + ')">' +
            '<div class="gallery-item__placeholder">' +
                '<span>' + f.emoji + '</span>' +
                '<span>' + f.label + '</span>' +
            '</div>' +
            '<div class="gallery-item__overlay">' +
                '<span>' + f.label + '</span>' +
            '</div>' +
        '</div>';
    }).join('');

    // Re-aplica scroll reveal nos novos itens
    initScrollReveal();
}

function renderizarFotoModal(index) {
    const foto = galeriaFotos[index];
    const img = document.getElementById('modalImg');
    const counter = document.getElementById('modalCounter');

    if (foto.src) {
        // Imagem real
        img.src = foto.src;
        img.alt = foto.label;
        img.style.objectFit = 'cover';
        img.style.maxWidth = '92vw';
        img.style.maxHeight = '85vh';
    } else {
        // Placeholder com canvas
        const canvas = document.createElement('canvas');
        canvas.width = 700;
        canvas.height = 500;
        const ctx = canvas.getContext('2d');

        // Fundo gradiente premium
        const grad = ctx.createRadialGradient(350, 250, 50, 350, 250, 350);
        grad.addColorStop(0, '#1a3050');
        grad.addColorStop(0.5, '#0f1a2b');
        grad.addColorStop(1, '#080c14');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 700, 500);

        // Moldura dourada
        ctx.strokeStyle = '#C9A96E';
        ctx.lineWidth = 2;
        ctx.shadowColor = 'rgba(201, 169, 110, 0.1)';
        ctx.shadowBlur = 10;
        ctx.strokeRect(25, 25, 650, 450);
        ctx.shadowBlur = 0;

        // Detalhes decorativos nos cantos
        const cornerLen = 15;
        ctx.strokeStyle = '#C9A96E';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(25, 25 + cornerLen); ctx.lineTo(25, 25); ctx.lineTo(25 + cornerLen, 25);
        ctx.moveTo(675 - cornerLen, 25); ctx.lineTo(675, 25); ctx.lineTo(675, 25 + cornerLen);
        ctx.moveTo(25, 475 - cornerLen); ctx.lineTo(25, 475); ctx.lineTo(25 + cornerLen, 475);
        ctx.moveTo(675 - cornerLen, 475); ctx.lineTo(675, 475); ctx.lineTo(675, 475 - cornerLen);
        ctx.stroke();

        // Emoji principal
        ctx.font = '100px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#C9A96E';
        ctx.shadowColor = 'rgba(201, 169, 110, 0.15)';
        ctx.shadowBlur = 20;
        ctx.fillText(foto.emoji, 350, 220);
        ctx.shadowBlur = 0;

        // Label
        ctx.font = '600 22px Cinzel, serif';
        ctx.fillStyle = '#eeede9';
        ctx.fillText(foto.label, 350, 330);

        // Subtítulo decorativo
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#b8b4ae';
        ctx.fillText('◆ Barba Negra LN ◆', 350, 375);

        img.src = canvas.toDataURL();
        img.alt = foto.label;
        img.style.objectFit = 'contain';
    }

    if (counter) {
        counter.textContent = (index + 1) + ' / ' + galeriaFotos.length;
    }
}

function abrirModal(index) {
    modalIndex = index;
    const modal = document.getElementById('modal');
    if (!modal) return;

    renderizarFotoModal(index);
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;

    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
}

function navegarGaleria(direcao) {
    modalIndex = (modalIndex + direcao + galeriaFotos.length) % galeriaFotos.length;
    renderizarFotoModal(modalIndex);
}

function initGaleria() {
    const modal = document.getElementById('modal');
    if (!modal) return;

    // Fechar ao clicar fora
    modal.addEventListener('click', function (e) {
        if (e.target === e.currentTarget) fecharModal();
    });

    // Navegação por teclado
    document.addEventListener('keydown', function (e) {
        if (!modal.classList.contains('modal--open')) return;

        switch (e.key) {
            case 'Escape':
                fecharModal();
                break;
            case 'ArrowLeft':
                navegarGaleria(-1);
                break;
            case 'ArrowRight':
                navegarGaleria(1);
                break;
        }
    });

    // Touch swipe no modal
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    modal.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) navegarGaleria(1);
            else navegarGaleria(-1);
        }
    }, { passive: true });
}

// =============================================
// WHATSAPP FLOATING BUTTON
// =============================================
function initWhatsAppFloat() {
    // O botão já está no HTML, só adicionar tooltip se quiser
    const btn = document.querySelector('.whatsapp-float');
    // Está no HTML — ok
}

// =============================================
// SCROLL TO TOP
// =============================================
function initScrollTop() {
    const btn = document.querySelector('.scroll-top');
    if (!btn) return;

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                btn.classList.toggle('visible', window.pageYOffset > 400);
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// =============================================
// SMOOTH SCROLL para links âncora
// =============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// =============================================
// COPIAR ENDEREÇO
// =============================================
function copiarEndereco() {
    const endereco = 'Rua XV de Outubro, N°180 - Rio Bonito, Joinville/SC (ao lado da Hardt Doces e Salgados)';

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(endereco).then(() => {
            mostrarToast('Endereço copiado! 📋', 'success');
        }).catch(() => {
            fallbackCopiar(endereco);
        });
    } else {
        fallbackCopiar(endereco);
    }

    const btn = document.querySelector('.btn--copy');
    if (btn) {
        btn.classList.add('copiado');
        btn.textContent = '✓ Copiado!';
        setTimeout(() => {
            btn.classList.remove('copiado');
            btn.innerHTML = '■ Copiar Endereço';
        }, 2500);
    }
}

function fallbackCopiar(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        mostrarToast('Endereço copiado! 📋', 'success');
    } catch (e) {
        mostrarToast('Clique e copie o endereço manualmente.', 'info');
    }
    document.body.removeChild(textarea);
}

// =============================================
// PARTÍCULAS DE FUNDO
// =============================================
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    // Reduz partículas em mobile
    const isMobile = window.innerWidth < 700;
    const count = isMobile ? 12 : 24;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = 1.5 + Math.random() * 2.5;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (15 + Math.random() * 25) + 's';
        particle.style.opacity = 0.08 + Math.random() * 0.12;
        container.appendChild(particle);
    }
}

// =============================================
// INICIALIZAÇÃO
// =============================================
document.addEventListener('DOMContentLoaded', function () {
    renderizarGaleria();
    initGaleria();
    initMobileMenu();
    initHeaderScroll();
    initScrollSpy();
    initScrollReveal();
    initSmoothScroll();
    initAgenda();
    initScrollTop();
    initWhatsAppFloat();
    initParticles();
});
