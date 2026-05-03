// Configuración
const whatsappNumber = "5355535098";

// Lista de precios (fácil de editar)
const listaPrecios = [
    { nombre: "Manicura Clásica", precio: "10 USD", descrip: "Corte, limado y esmalte tradicional" },
    { nombre: "Esmaltado Semipermanente", precio: "15 USD", descrip: "Duración de hasta 3 semanas" },
    { nombre: "Diseños Artísticos (por uña)", precio: "2 USD", descrip: "Decoración personalizada" },
    { nombre: "Pedicura Completa", precio: "18 USD", descrip: "Exfoliación, hidratación y esmalte" },
    { nombre: "Manicura + Pedicura", precio: "25 USD", descrip: "Pack completo manos y pies" },
    { nombre: "Retiro de Semipermanente", precio: "5 USD", descrip: "Remoción sin dañar la uña" }
];

// WhatsApp
function abrirWhatsApp(servicio = "") {
    let mensaje = "Hola CesiaNails, me gustaría agendar un turno para:";
    if (servicio) {
        mensaje += ` ${servicio}. `;
    } else {
        mensaje += " Me gustaría recibir información sobre los servicios y precios.";
    }
    mensaje += " Por favor, indíquenme disponibilidad. ¡Gracias!";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
}

// Generar dropdown de precios
function generarMenuPrecios() {
    const container = document.getElementById("preciosDropdown");
    if (!container) return;
    container.innerHTML = "";
    listaPrecios.forEach(item => {
        const link = document.createElement("a");
        link.href = "#";
        link.innerHTML = `${item.nombre} - ${item.precio}`;
        link.addEventListener("click", (e) => {
            e.preventDefault();
            abrirWhatsApp(item.nombre);
        });
        container.appendChild(link);
    });
}

// Generar sección de precios completa
function generarSeccionPrecios() {
    const container = document.getElementById("preciosContainer");
    if (!container) return;
    container.innerHTML = "";
    listaPrecios.forEach(item => {
        const div = document.createElement("div");
        div.className = "precio-item";
        div.innerHTML = `
            <h3>${item.nombre}</h3>
            <p>${item.precio}</p>
            <small>${item.descrip}</small>
            <br><br>
            <button class="btn-whatsapp btn-small" data-servicio="${item.nombre}" style="padding: 8px 16px; font-size: 0.9rem;">
                <i class="fab fa-whatsapp"></i> Pedir este servicio
            </button>
        `;
        container.appendChild(div);
    });
    document.querySelectorAll(".btn-small").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const servicio = btn.getAttribute("data-servicio");
            abrirWhatsApp(servicio);
        });
    });
}

// Carrusel
function initCarousel() {
    const track = document.getElementById("carouselTrack");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    if (!track) return;
    const slides = Array.from(track.children);
    let currentIndex = 0;
    const slideWidth = slides[0]?.getBoundingClientRect().width;
    if (!slideWidth) return;
    const moveToSlide = (index) => {
        track.style.transform = `translateX(-${index * slideWidth}px)`;
        currentIndex = index;
    };
    nextBtn?.addEventListener("click", () => {
        const nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    });
    prevBtn?.addEventListener("click", () => {
        const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        moveToSlide(prevIndex);
    });
    window.addEventListener("resize", () => {
        const newWidth = slides[0]?.getBoundingClientRect().width;
        if (newWidth) moveToSlide(currentIndex);
    });
}

// Menú móvil
function initMobileMenu() {
    const toggle = document.getElementById("mobileMenu");
    const navLinks = document.getElementById("navLinks");
    const dropdown = document.querySelector(".dropdown");
    if (toggle && navLinks) {
        toggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
        });
        // Cerrar menú al hacer clic en un enlace
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
            });
        });
    }
    if (dropdown && window.innerWidth <= 768) {
        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });
    }
}

// Botones WhatsApp
function initWhatsAppButtons() {
    const heroBtn = document.getElementById("whatsappBtnHero");
    const contactBtn = document.getElementById("whatsappBtnContacto");
    heroBtn?.addEventListener("click", () => abrirWhatsApp());
    contactBtn?.addEventListener("click", () => abrirWhatsApp());
}

// Formulario de contacto
function initContactForm() {
    const form = document.getElementById("contactForm");
    const feedback = document.getElementById("formFeedback");
    if (!form) return;
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        if (!nombre || !email || !mensaje) {
            feedback.textContent = "❌ Por favor completa todos los campos.";
            feedback.style.color = "red";
            return;
        }
        // Simular envío (podrías conectar a un backend)
        feedback.textContent = "✅ ¡Mensaje enviado! Nos pondremos en contacto pronto.";
        feedback.style.color = "green";
        form.reset();
        setTimeout(() => { feedback.textContent = ""; }, 3000);
    });
}

// Inicializar todo
document.addEventListener("DOMContentLoaded", () => {
    generarMenuPrecios();
    generarSeccionPrecios();
    initCarousel();
    initMobileMenu();
    initWhatsAppButtons();
    initContactForm();
    AOS.init({ duration: 800, once: true }); // Animaciones scroll
});