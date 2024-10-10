// assets/js/binary.js

// Function to create binary rain effect
function startBinaryEffect() {
    const binaryContainer = document.getElementById('binary-container') || document.createElement('div');
    binaryContainer.id = 'binary-container';
    document.body.appendChild(binaryContainer);

    const createBinaryDrop = () => {
        const binaryDrop = document.createElement('div');
        binaryDrop.classList.add('binary-text');
        binaryDrop.innerText = Math.random() < 0.5 ? '0' : '1';
        binaryDrop.style.left = `${Math.random() * 100}%`;
        binaryDrop.style.fontSize = `${Math.random() * 20 + 10}px`;
        binaryDrop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        binaryDrop.style.opacity = `${Math.random() * 0.5 + 0.5}`;
        binaryContainer.appendChild(binaryDrop);

        setTimeout(() => {
            binaryDrop.remove();
        }, (parseFloat(binaryDrop.style.animationDuration) * 1000));
    };

    const interval = setInterval(createBinaryDrop, 100);
    window.binaryInterval = interval;
}

// Function to stop binary rain effect
function stopBinaryEffect() {
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        binaryContainer.remove();
    }
    if (window.binaryInterval) {
        clearInterval(window.binaryInterval);
        window.binaryInterval = null;
    }
}

// Start binary effect when quantum mode is activated
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('quantum-mode')) {
        startBinaryEffect();
    }
});

// Listen for changes in quantum mode
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (document.body.classList.contains('quantum-mode')) {
                startBinaryEffect();
            } else {
                stopBinaryEffect();
            }
        }
    });
});

observer.observe(document.body, { attributes: true });

// Animation for binary rain
const style = document.createElement('style');
style.innerHTML = `
    @keyframes fall {
        0% { transform: translateY(0); }
        100% { transform: translateY(100vh); }
    }
`;
document.head.appendChild(style);
