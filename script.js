const container = document.getElementById('particle-container');
const shapes = ['circle', 'square', 'triangle'];
const shapeCount = 25;
const mouse = { x: -2000, y: -2000 };
const particleArray = [];

document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Particle {
    constructor() {
        this.el = document.createElement('div');
        const type = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 20 + 10;
        this.el.className = `shape ${type}`;
        if(type !== 'triangle') {
            this.el.style.width = `${size}px`;
            this.el.style.height = `${size}px`;
        }
        container.appendChild(this.el);
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.repelRadius = 150;
    }

    update() {
        this.y += this.speedY;
        if (this.y > window.innerHeight + 50) {
            this.y = -50;
            this.x = Math.random() * window.innerWidth;
        }
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < this.repelRadius) {
            const force = (this.repelRadius - distance) / this.repelRadius;
            this.x -= (dx / distance) * force * 10;
            this.y -= (dy / distance) * force * 10;
        }
        this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
    }
}

function init() {
    particleArray.length = 0;
    container.innerHTML = '';
    for (let i = 0; i < shapeCount; i++) particleArray.push(new Particle());
}

function animate() {
    particleArray.forEach(p => p.update());
    requestAnimationFrame(animate);
}

init();
animate();
window.addEventListener('resize', init);

// Typewriter effect and Loader
document.addEventListener("DOMContentLoaded", () => {
    // 1. Setup Loader
    const loaderWrapper = document.getElementById('loader-wrapper');
    const terminalText = document.getElementById('terminal-text');
    
    if (loaderWrapper && terminalText) {
        document.body.classList.add('loading');
        const bootSequence = [
            "> initializing_environment...",
            "> loading_assets [100%]",
            "> welcome_pratyay;"
        ];
        
        let lineIndex = 0;
        let charIndex = 0;
        
        function typeLoader() {
            if (lineIndex < bootSequence.length) {
                const currentLine = bootSequence[lineIndex];
                if (charIndex < currentLine.length) {
                    terminalText.innerHTML += currentLine.charAt(charIndex);
                    charIndex++;
                    setTimeout(typeLoader, 30 + Math.random() * 40);
                } else {
                    terminalText.innerHTML += "<br>";
                    lineIndex++;
                    charIndex = 0;
                    setTimeout(typeLoader, 400);
                }
            } else {
                setTimeout(() => {
                    loaderWrapper.classList.add('fade-out');
                    document.body.classList.remove('loading');
                    setTimeout(startHeroTypewriter, 500); // Start hero typing after fade starts
                }, 800);
            }
        }
        setTimeout(typeLoader, 300);
    } else {
        startHeroTypewriter();
    }

    // 2. Hero Typewriter Function
    function startHeroTypewriter() {
        const nameEl = document.querySelector('.highlight');
        if (nameEl && !nameEl.dataset.typed) {
            nameEl.dataset.typed = 'true'; // prevent double execution
            const text = nameEl.textContent.trim();
            nameEl.textContent = '';
            nameEl.style.borderRight = '3px solid var(--accent-color)';
            nameEl.style.animation = 'blink-caret 0.75s step-end infinite';
            nameEl.style.paddingRight = '5px';
            
            let i = 0;
            function typeWriter() {
                if (i < text.length) {
                    nameEl.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 120);
                }
            }
            setTimeout(typeWriter, 100);
        }
    }
});