// --- Custom Cursor ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Only run custom cursor logic if not on a touch device
if (window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Slight delay for the outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 150, fill: "forwards" });
    });

    // Add hover effect to interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, .magnetic');
    interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('hover');
        });
    });
}

// --- Scroll Progress Bar ---
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.getElementById('progressBar').style.width = scrollPercent + '%';
});

// --- Header Scroll Effect & Mobile Menu ---
const header = document.querySelector('.header');
const menuIcon = document.querySelector('.menu-icon');
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

menuIcon.addEventListener('click', () => {
    navbar.classList.toggle('active');
    let icon = menuIcon.querySelector('i');
    if (navbar.classList.contains('active')) {
        icon.classList.replace('bx-menu', 'bx-x');
    } else {
        icon.classList.replace('bx-x', 'bx-menu');
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        menuIcon.querySelector('i').classList.replace('bx-x', 'bx-menu');
    });
});

// --- Typed.js ---
new Typed(".typed-text", {
    strings: ["Frontend Developer", "UI/UX Designer", "Graphic Designer", "AI Explorer", "Content Writer"],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// --- TSParticles (Deep Space Theme) ---
tsParticles.load("tsparticles", {
    fpsLimit: 60,
    background: {
        color: "#050A1A"
    },
    interactivity: {
        events: {
            onHover: {
                enable: true,
                mode: "repulse",
            },
            resize: true,
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4,
            },
        },
    },
    particles: {
        color: {
            value: ["#ffffff", "#00E5FF", "#7B2FBE"]
        },
        links: {
            enable: true,
            color: "random",
            distance: 150,
            opacity: 0.2,
            width: 1,
        },
        move: {
            direction: "none",
            enable: true,
            outModes: {
                default: "bounce",
            },
            random: true,
            speed: 1,
            straight: false,
        },
        number: {
            density: {
                enable: true,
                area: 800,
            },
            value: 80,
        },
        opacity: {
            value: { min: 0.1, max: 0.5 },
            animation: {
                enable: true,
                speed: 1,
                minimumValue: 0.1,
            }
        },
        shape: {
            type: "circle",
        },
        size: {
            value: { min: 1, max: 3 },
            random: true,
            animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.1,
            }
        },
    },
    detectRetina: true,
});

// --- Magnetic Hover Effect ---
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach((el) => {
    if (window.matchMedia("(pointer: fine)").matches) {
        el.addEventListener('mousemove', (e) => {
            const position = el.getBoundingClientRect();
            const x = e.clientX - position.left - position.width / 2;
            const y = e.clientY - position.top - position.height / 2;

            // Apply a slight transform based on mouse position relative to element center
            gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                ease: "power2.out",
                duration: 0.3
            });
        });

        el.addEventListener('mouseleave', () => {
            // Reset position
            gsap.to(el, {
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.3)",
                duration: 1
            });
        });
    }
});

// --- GSAP ScrollTrigger Animations ---
gsap.registerPlugin(ScrollTrigger);

// Utility function to animate elements on scroll
const fadeUpElements = gsap.utils.toArray('.fade-up');

fadeUpElements.forEach((el) => {
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%", // Trigger when the top of the element hits 85% of the viewport height
            toggleActions: "play none none reverse" // Play on enter, reverse on leave back
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});