// assets/js/binary.js

// Function to create binary rain effect
function startBinaryEffect() {
    const rainContainer = document.getElementById('quantum-binary-rain');

    // Create multiple binary streams
    for (let i = 0; i < 100; i++) {
        const binaryStream = document.createElement('div');
        binaryStream.classList.add('binary-stream');
        binaryStream.style.left = `${Math.random() * 100}%`;
        binaryStream.style.animationDuration = `${Math.random() * 3 + 2}s`;
        binaryStream.style.animationDelay = `${Math.random() * 5}s`;

        // Generate a random binary string
        const binaryLength = Math.floor(Math.random() * 50) + 10;
        let binaryString = '';
        for (let j = 0; j < binaryLength; j++) {
            binaryString += Math.random() < 0.5 ? '0' : '1';
        }
        binaryStream.innerText = binaryString;

        rainContainer.appendChild(binaryStream);
    }

    // Create Quantum Text Overlay for qc.json
    const quantumTextOverlay = document.createElement('div');
    quantumTextOverlay.classList.add('quantum-text-overlay');
    quantumTextOverlay.id = 'quantum-text-overlay';
    quantumTextOverlay.innerText = translateToBinary(getTextFromQCJson());
    rainContainer.appendChild(quantumTextOverlay);
}

// Function to stop binary rain effect
function stopBinaryEffect() {
    const rainContainer = document.getElementById('quantum-binary-rain');
    rainContainer.innerHTML = '';
}

// Helper function to get text from qc.json
function getTextFromQCJson() {
    // Assuming qc.json is loaded and stored in a global variable named qcData
    // For security reasons, fetching local JSON files directly via fetch may not work without a server
    // This function should be adjusted based on how qcData is loaded
    if (typeof qcData !== 'undefined') {
        let text = '';
        for (const key in qcData) {
            text += qcData[key] + ' ';
        }
        return text.trim();
    }
    return '';
}

// Helper function to translate text to binary
function translateToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

// Start binary effect on quantum mode activation
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
