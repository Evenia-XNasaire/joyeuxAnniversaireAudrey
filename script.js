console.log("Script loaded successfully!");

window.addEventListener('load', () => {
    // Force la vidéo à être muette dès le départ
    const video = document.getElementById('hero-video');
    if (video) {
        video.muted = true;
        video.volume = 0; // Sécurité supplémentaire
    }

    // Initial Confetti after a small delay
    setTimeout(() => {
        // fireConfetti(); // Optional: do we want confetti at start or only on click?
    }, 500);

    // Scroll Reveal Logic
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check
});

function fireConfetti() {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // since particles fall down, start a bit higher than random
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Sound Logic (Fichier MP3 Local)
const video = document.getElementById('hero-video');
const music = document.getElementById('birthday-music');
const splash = document.getElementById('splash-screen');
const startBtn = document.getElementById('start-experience');

startBtn.addEventListener('click', () => {
    // 1. Démarrer la musique locale
    if (music) {
        music.play().catch(e => console.error("Erreur lecture audio:", e));
    }

    // 2. Démarrer la vidéo (muette)
    if (video) {
        video.play();
        video.muted = true;
    }

    // 3. Masquer le splash screen
    splash.classList.add('hidden');

    // 4. Lancer les confettis
    fireConfetti();

    console.log("Expérience démarrée !");
});

// Slider Logic
const slider = document.getElementById('story-slider');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-slide');
const nextBtn = document.getElementById('next-slide');
let currentSlide = 0;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlider();
});

prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    updateSlider();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        updateSlider();
    });
});

// Interactive Gallery - Festive click animation
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        fireConfetti();

        // Add a temporary "pop" animation
        item.style.transform = "scale(0.95)";
        setTimeout(() => {
            item.style.transform = "";
        }, 100);
    });
});
