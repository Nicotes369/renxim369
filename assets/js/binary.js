// assets/js/binary.js

// Function to create binary rain effect
function startBinaryEffect() {
    const binaryContainer = document.createElement('div');
    binaryContainer.id = 'binary-container';
    binaryContainer.style.position = 'fixed';
    binaryContainer.style.top = '0';
    binaryContainer.style.left = '0';
    binaryContainer.style.width = '100%';
    binaryContainer.style.height = '100%';
    binaryContainer.style.pointerEvents = 'none';
    binaryContainer.style.zIndex = '100';
    document.body.appendChild(binaryContainer);

    const createBinaryDrop = () => {
        const binaryDrop = document.createElement('div');
        binaryDrop.innerText = Math.random() < 0.5 ? '0' : '1';
        binaryDrop.classList.add('binary-text');
        binaryDrop.style.left = `${Math.random() * 100}%`;
        binaryDrop.style.fontSize = `${Math.random() * 20 + 10}px`;
        binaryDrop.style.opacity = Math.random();
        binaryDrop.style.animationDuration = `${Math.random() * 3 + 2}s`;
        binaryDrop.style.animationDelay = `${Math.random() * 5}s`;
        binaryContainer.appendChild(binaryDrop);

        setTimeout(() => {
            binaryDrop.remove();
        }, (Math.random() * 5000) + 2000);
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

// Function to translate text to binary
function textToBinary(text) {
    return text.split('').map(char => {
        return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join(' ');
}

// Function to display translated binary text
function displayTranslatedBinary() {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Get translated binary from qc.json
    fetch('assets/languages/qc.json')
        .then(response => response.json())
        .then(data => {
            const translatedBinary = data.translated_binary; // Assuming qc.json has "translated_binary" key
            const binaryElement = document.createElement('div');
            binaryElement.classList.add('translated-binary-text');
            binaryElement.innerText = translatedBinary;
            binaryContainer.appendChild(binaryElement);
        })
        .catch(error => {
            console.error('Error loading qc.json:', error);
        });
}

// Invoke displayTranslatedBinary when Quantum Computer mode is activated
languageSelect.addEventListener('change', function() {
    if (this.value === 'qc') {
        displayTranslatedBinary();
    }
});
