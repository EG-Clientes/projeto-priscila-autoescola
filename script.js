// Espera o site carregar totalmente
document.addEventListener("DOMContentLoaded", function() {
    
    // Configura o observador de tela
    const observerOptions = {
        threshold: 0.1 // Ativa quando 10% do elemento aparece
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Se o elemento entrar na tela...
            if (entry.isIntersecting) {
                // Adiciona a classe 'active' que dispara o CSS de movimento
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    // Manda o observador vigiar os elementos de animação
    const elements = document.querySelectorAll('.reveal-left, .reveal-bottom');
    elements.forEach((el) => observer.observe(el));

    console.log("Sistema de animação carregado com sucesso!");
});
// Lógica do Menu Hambúrguer
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");
const links = document.querySelectorAll(".nav-links li a");

function toggleMenu() {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
    overlay.classList.toggle("active");
    // Trava o scroll da página quando o menu tá aberto
    document.body.style.overflow = navLinks.classList.contains("active") ? "hidden" : "initial";
}

hamburger.addEventListener("click", toggleMenu);
overlay.addEventListener("click", toggleMenu);

// Fecha o menu ao clicar em qualquer link
links.forEach(link => {
    link.addEventListener("click", toggleMenu);
});
// --- SISTEMA INDEPENDENTE DE CONTADORES (DOBRA 2) ---
function initPremiumCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100; // Ajusta a velocidade da contagem

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const animate = () => {
                    const count = +entry.target.innerText;
                    const increment = target / speed;

                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + increment);
                        setTimeout(animate, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                animate();
                counterObserver.unobserve(entry.target); // Para de observar após animar uma vez
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Inicia a função sem interferir no DOMContentLoaded original
initPremiumCounters();
// --- LÓGICA DO CARROSSEL AUTOMÁTICO (INFINITO APENAS NO MOBILE) ---
function initMobileCarousel() {
    // Só inicia se a tela for menor que 768px (Mobile)
    if (window.innerWidth > 768) return;

    const container = document.querySelector('.carousel-container');
    const track = document.querySelector('.carousel-track');
    
    if (!container || !track) return;

    const cards = track.querySelectorAll('.testimonial-slide');
    let currentIndex = 0;

    const autoPlay = setInterval(() => {
        const cardWidth = cards[0].offsetWidth + 15; // Largura do card + gap de 15px do seu CSS mobile
        const maxScroll = container.scrollWidth - container.clientWidth;

        // Se chegou no último card, volta para o primeiro
        if (container.scrollLeft >= maxScroll - 10) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
            currentIndex = 0;
        } else {
            // Avança para o próximo card respeitando o snap do CSS
            currentIndex++;
            container.scrollTo({ 
                left: currentIndex * cardWidth, 
                behavior: 'smooth' 
            });
        }
    }, 3500); // Move a cada 3.5 segundos

    // Pausa o carrossel se o usuário tocar na tela para ler (Melhora a UX)
    container.addEventListener('touchstart', () => clearInterval(autoPlay), {passive: true});
}

// Inicia a verificação do carrossel
initMobileCarousel();
// --- LÓGICA DE SCROLL SUAVE PARA LINKS INTERNOS ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Ignora links que sejam apenas "#" ou links externos
        const targetId = this.getAttribute('href');
        if (targetId === "#") return;

        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            e.preventDefault(); // Impede o "pulo" instantâneo do navegador

            // Realiza o deslize suave até a posição do ID
            window.scrollTo({
                // Ajustado para -100 para compensar o tamanho do seu menu que agora é fixo
                top: targetElement.offsetTop - 100, 
                behavior: 'smooth'
            });

            // Se o menu mobile estiver aberto, fecha ele após o clique
            if (navLinks.classList.contains("active")) {
                toggleMenu();
            }
        }
    });
});
// --- LÓGICA DE TRANSPARÊNCIA DO MENU AO ROLAR ---
function handleHeaderScroll() {
    const header = document.querySelector('header');
    // Se rolar mais de 50 pixels, ativa a cor sólida
    if (window.scrollY > 50) {
        header.classList.add('header-active');
    } else {
        header.classList.remove('header-active');
    }
}

// Escuta o evento de scroll do navegador
window.addEventListener('scroll', handleHeaderScroll);