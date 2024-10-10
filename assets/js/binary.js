// assets/js/binary.js

// Function to create binary rain effect
function startBinaryEffect() {
    const binaryRain = document.querySelector('.binary-rain');
    if (!binaryRain) return;

    for (let i = 0; i < 100; i++) { // Number of streams
        const stream = document.createElement('div');
        stream.classList.add('binary-stream');
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.animationDuration = `${Math.random() * 5 + 5}s`;
        stream.style.animationDelay = `${Math.random() * 10}s`;

        const binaryText = document.createElement('span');
        binaryText.textContent = generateRandomBinaryString(200); // Longer binary string for gradient effect
        stream.appendChild(binaryText);

        binaryRain.appendChild(stream);
    }
}

// Function to create QC text rain effect
function startQcTextEffect() {
    const qcRain = document.querySelector('.qc-text-rain');
    if (!qcRain) return;

    for (let i = 0; i < 50; i++) { // Number of QC streams
        const qcStream = document.createElement('div');
        qcStream.classList.add('qc-stream');
        qcStream.style.left = `${Math.random() * 100}%`;
        qcStream.style.animationDuration = `${Math.random() * 5 + 10}s`;
        qcStream.style.animationDelay = `${Math.random() * 15}s`;

        const qcText = document.createElement('span');
        qcText.textContent = generateRandomBinaryString(200); // Longer binary string for gradient effect
        qcStream.appendChild(qcText);

        qcRain.appendChild(qcStream);
    }
}

// Function to generate random binary string
function generateRandomBinaryString(length = 100) {
    let binaryStr = '';
    for (let i = 0; i < length; i++) {
        binaryStr += Math.random() < 0.5 ? '0' : '1';
        if ((i + 1) % 8 === 0) binaryStr += ' '; // Add space every 8 bits for readability
    }
    return binaryStr.trim();
}

// Function to stop binary rain effect
function stopBinaryEffect() {
    const binaryRain = document.querySelector('.binary-rain');
    if (binaryRain) {
        binaryRain.innerHTML = '';
    }
    const qcRain = document.querySelector('.qc-text-rain');
    if (qcRain) {
        qcRain.innerHTML = '';
    }
}

// Start binary effects when quantum mode is activated
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('quantum-mode')) {
        startBinaryEffect();
        startQcTextEffect();
    }
});

// Listen for changes in quantum mode
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            if (document.body.classList.contains('quantum-mode')) {
                startBinaryEffect();
                startQcTextEffect();
            } else {
                stopBinaryEffect();
            }
        }
    });
});

observer.observe(document.body, { attributes: true });
