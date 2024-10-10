// assets/js/binary.js

// Binary Rain Effect using Canvas for better performance
(function() {
    let canvas, ctx;
    let columns;
    let drops = [];
    const fontSize = 16;
    const binaryBits = ['0⟩', '1⟩'];
    let animationId;

    // Initialize Canvas
    function initializeCanvas() {
        canvas = document.createElement('canvas');
        canvas.id = 'binary-canvas';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        initializeDrops();
        animate();
    }

    // Resize Canvas to Fullscreen
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    // Initialize Drops
    function initializeDrops() {
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    // Draw Function
    function draw() {
        // Black background with opacity for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set neon blue color and font
        ctx.fillStyle = '#00ccff';
        ctx.font = `${fontSize}px 'Orbitron', sans-serif`;

        // Draw binary bits
        for (let i = 0; i < drops.length; i++) {
            const bit = binaryBits[Math.floor(Math.random() * binaryBits.length)];
            ctx.fillText(bit, i * fontSize, drops[i] * fontSize);

            // Reset drop to top after it reaches the bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    // Animation Loop
    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }

    // Start Binary Rain Effect
    function startBinaryRain() {
        if (!canvas) {
            initializeCanvas();
        }
    }

    // Stop Binary Rain Effect
    function stopBinaryRain() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (canvas) {
            canvas.remove();
            canvas = null;
            ctx = null;
        }
    }

    // Listen for Quantum Computer mode activation/deactivation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('quantum-mode')) {
                    startBinaryRain();
                } else {
                    stopBinaryRain();
                }
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    // Initialize on page load if Quantum Computer mode is active
    document.addEventListener('DOMContentLoaded', () => {
        if (document.body.classList.contains('quantum-mode')) {
            startBinaryRain();
        }
    });
})();
