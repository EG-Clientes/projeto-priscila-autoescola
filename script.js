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
// --- LÓGICA DO CARROSSEL DE DEPOIMENTOS ---
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.carousel-btn.next');
    const prevButton = document.querySelector('.carousel-btn.prev');
    const dots = document.querySelectorAll('.dot');
    
    let currentIndex = 0;

    const updateCarousel = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove('active'));
        dots[index].classList.add('active');
    };

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    });

    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateCarousel(currentIndex);
    });

    // Clique nos pontinhos
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // Auto Play (Opcional - roda a cada 5 segundos)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel(currentIndex);
    }, 5000);
}

initCarousel();