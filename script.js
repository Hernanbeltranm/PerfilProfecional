// ========================================
// Variables Globales
// ========================================
const typingTexts = [
    'Backend Developer',
    'Java Specialist',
    'SQL Expert',
    'Frontend Developer',
    'Lifelong Learner'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

// ========================================
// Efecto de escritura (Typing Effect)
// ========================================
function typeEffect() {
    const typingElement = document.querySelector('.typing-text');
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pausa al final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// ========================================
// Navegación Móvil
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// Scroll Suave y Cambio de Color en Navbar
// ========================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
    }
});

// ========================================
// Animación de Barras de Habilidades
// ========================================
const skillsSection = document.querySelector('.skills-section');
let skillsAnimated = false;

const animateSkills = () => {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        bar.style.width = progress + '%';
    });
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            animateSkills();
            skillsAnimated = true;
        }
    });
}, observerOptions);

if (skillsSection) {
    observer.observe(skillsSection);
}

// ========================================
// Animación de Entrada para Elementos
// ========================================
const observeElements = () => {
    const elements = document.querySelectorAll('.skill-category, .timeline-item, .education-card, .project-card, .article-card, .testimonial-card, .contact-item');
    
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
        elementObserver.observe(element);
    });
};

// ========================================
// Partículas de Fondo Animadas
// ========================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 5 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.8), rgba(118, 75, 162, 0.4));
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: float-particle ${duration}s ease-in-out ${delay}s infinite;
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Agregar estilos de animación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float-particle {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0.5;
            }
            25% {
                transform: translate(20px, -20px) scale(1.2);
                opacity: 0.8;
            }
            50% {
                transform: translate(-20px, 20px) scale(0.8);
                opacity: 0.6;
            }
            75% {
                transform: translate(20px, 20px) scale(1.1);
                opacity: 0.7;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// Highlighting del Link Activo en la Navegación
// ========================================
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========================================
// Efecto de Parallax Suave
// ========================================
function parallaxEffect() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.profile-image-wrapper');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
}

window.addEventListener('scroll', parallaxEffect);

// ========================================
// Contador de Estadísticas (si se agregan más adelante)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// Smooth Scroll para Safari
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Efecto de Hover en Cards
// ========================================
function addCardEffects() {
    const cards = document.querySelectorAll('.skill-category, .education-card, .project-card, .article-card, .testimonial-card, .timeline-content');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// ========================================
// Preloader (opcional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Fade in effect
    const fadeElements = document.querySelectorAll('.hero-content, .section');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
        }, index * 100);
    });
});

// ========================================
// Cursor personalizado (efecto extra)
// ========================================
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #667eea;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.display = 'block';
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    // Expandir cursor en hover sobre elementos interactivos
    const interactiveElements = document.querySelectorAll('a, button, .btn');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = 'rgba(102, 126, 234, 0.2)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = 'transparent';
        });
    });
}

// ========================================
// Testimonios: un comentario por navegador (cookie)
// ========================================
const TESTIMONIAL_COOKIE_NAME = 'hb_testimonial_user';
const TESTIMONIAL_STORAGE_KEY = 'hb_testimonial_data';

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function getCookie(name) {
    const cookies = document.cookie ? document.cookie.split('; ') : [];
    for (let i = 0; i < cookies.length; i++) {
        const [key, ...rest] = cookies[i].split('=');
        if (key === name) {
            return decodeURIComponent(rest.join('='));
        }
    }
    return null;
}

function generateUserId() {
    if (window.crypto && typeof window.crypto.randomUUID === 'function') {
        return window.crypto.randomUUID();
    }
    return `u_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function safeParseJSON(value) {
    try {
        return JSON.parse(value);
    } catch (_error) {
        return null;
    }
}

function getStoredTestimonials() {
    const raw = localStorage.getItem(TESTIMONIAL_STORAGE_KEY);
    const parsed = raw ? safeParseJSON(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
}

function saveStoredTestimonials(testimonials) {
    localStorage.setItem(TESTIMONIAL_STORAGE_KEY, JSON.stringify(testimonials));
}

function upsertTestimonialData(userId, name, comment) {
    const testimonials = getStoredTestimonials();
    const existingIndex = testimonials.findIndex(item => item.userId === userId);
    const payload = {
        userId,
        name,
        comment,
        updatedAt: new Date().toISOString()
    };

    if (existingIndex >= 0) {
        testimonials[existingIndex] = payload;
    } else {
        testimonials.push(payload);
    }
    saveStoredTestimonials(testimonials);
}

function getTestimonialByUserId(userId) {
    const testimonials = getStoredTestimonials();
    return testimonials.find(item => item.userId === userId) || null;
}

function renderUserTestimonial(testimonial, userId) {
    if (!testimonial) {
        return;
    }

    const grid = document.querySelector('.testimonials-grid');
    if (!grid) {
        return;
    }

    const existingCard = grid.querySelector(`[data-user-id="${userId}"]`);
    const card = existingCard || document.createElement('article');
    card.className = 'testimonial-card testimonial-card--mine';
    card.setAttribute('data-user-id', userId);
    card.innerHTML = `
        <p class="testimonial-text">"${testimonial.comment}"</p>
        <h3 class="testimonial-author">${testimonial.name} (Tu comentario)</h3>
    `;

    if (!existingCard) {
        grid.appendChild(card);
    }
}

function updateFormMode(hasComment) {
    const submitBtn = document.getElementById('testimonialSubmitBtn');
    const help = document.getElementById('testimonialFormHelp');

    if (!submitBtn || !help) {
        return;
    }

    if (hasComment) {
        submitBtn.innerHTML = '<i class="fas fa-pen"></i> Actualizar comentario';
        help.textContent = 'Ya tienes un comentario en este navegador. Solo puedes editar ese mismo comentario.';
    } else {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Publicar comentario';
        help.textContent = 'Puedes publicar un solo comentario desde este navegador y luego editarlo cuando quieras.';
    }
}

function setFeedback(message, type) {
    const feedback = document.getElementById('testimonialFeedback');
    if (!feedback) {
        return;
    }

    feedback.textContent = message;
    feedback.classList.remove('success', 'error');
    if (type) {
        feedback.classList.add(type);
    }
}

function initTestimonialsForm() {
    const form = document.getElementById('testimonialForm');
    const nameInput = document.getElementById('testimonialName');
    const commentInput = document.getElementById('testimonialComment');

    if (!form || !nameInput || !commentInput) {
        return;
    }

    const userId = getCookie(TESTIMONIAL_COOKIE_NAME);
    const existing = userId ? getTestimonialByUserId(userId) : null;

    if (existing) {
        nameInput.value = existing.name;
        commentInput.value = existing.comment;
        renderUserTestimonial(existing, userId);
    }

    updateFormMode(Boolean(existing));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = nameInput.value.trim();
        const comment = commentInput.value.trim();

        if (!name || !comment) {
            setFeedback('Completa nombre y comentario antes de enviar.', 'error');
            return;
        }

        const normalizedUserId = getCookie(TESTIMONIAL_COOKIE_NAME) || generateUserId();
        if (!getCookie(TESTIMONIAL_COOKIE_NAME)) {
            setCookie(TESTIMONIAL_COOKIE_NAME, normalizedUserId, 365);
        }

        const payload = { userId: normalizedUserId, name, comment };
        upsertTestimonialData(payload.userId, payload.name, payload.comment);
        renderUserTestimonial(payload, payload.userId);
        updateFormMode(true);
        setFeedback('Tu comentario fue guardado. Desde este navegador solo podrás editar este mismo comentario.', 'success');
    });
}

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
    observeElements();
    createParticles();
    addCardEffects();
    initTestimonialsForm();
    // createCustomCursor(); // Descomentar si se desea cursor personalizado
    
    console.log('%c¡Hola! 👋', 'color: #667eea; font-size: 24px; font-weight: bold;');
    console.log('%cGracias por visitar mi CV', 'color: #764ba2; font-size: 16px;');
    console.log('%c- Hernán Beltrán', 'color: #718096; font-size: 14px; font-style: italic;');
});

// ========================================
// Efecto de escritura en consola
// ========================================
setTimeout(() => {
    console.log('%cTecnologías: Java | SQL | HTML | CSS | Bootstrap', 'color: #667eea; font-size: 12px;');
}, 1000);
