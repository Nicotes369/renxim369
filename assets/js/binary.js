// assets/js/binary.js

// Function to create and animate binary columns
function createBinaryColumn(index, totalColumns) {
    const binaryContainer = document.getElementById('binary-container');
    const column = document.createElement('div');
    column.classList.add('binary-column');
    column.style.left = `${(index / totalColumns) * 100}%`;
    column.style.animationDelay = `${Math.random() * 5}s`; // Randomize start time
    column.style.animationDuration = `${Math.random() * 3 + 5}s`; // Randomize speed between 5-8s

    // Generate binary bits for the column
    for (let i = 0; i < 30; i++) { // Adjust number of bits per column
        const bit = document.createElement('div');
        bit.classList.add('binary-text');
        bit.innerText = Math.random() < 0.5 ? '0⟩' : '1⟩';
        bit.style.fontSize = `${Math.random() * 8 + 12}px`; // Randomize font size between 12-20px
        column.appendChild(bit);
    }

    binaryContainer.appendChild(column);

    // Remove column after animation completes to prevent overflow
    column.addEventListener('animationend', () => {
        column.remove();
    });
}

// Initialize Binary Columns
function initializeBinaryColumns() {
    const binaryContainer = document.getElementById('binary-container');
    const fontSize = 16; // Base font size
    const totalColumns = Math.floor(window.innerWidth / (fontSize * 1.5));
    
    for (let i = 0; i < totalColumns; i++) {
        setInterval(() => {
            createBinaryColumn(i, totalColumns);
        }, Math.random() * 2000); // Random interval between column creations
    }
}

// Start Binary Effect
function startBinaryEffect() {
    initializeBinaryColumns();
}

// Function to stop binary rain effect
function stopBinaryEffect() {
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        binaryContainer.innerHTML = '';
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
