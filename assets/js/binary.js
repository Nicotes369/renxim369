// assets/js/binary.js

let binaryInterval; // Interval IDを保持する変数

// Binary Mode Columns Configuration
const columns = 100; // Number of columns; adjust as needed
const binaryContainer = document.getElementById('binary-container') || document.createElement('div');
binaryContainer.id = 'binary-container';
document.body.appendChild(binaryContainer);

// Function to create a binary column
function createBinaryColumn(index) {
    const column = document.createElement('div');
    column.classList.add('binary-column');
    column.style.left = `${(index / columns) * 100}%`;
    column.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize speed
    binaryContainer.appendChild(column);

    // Populate column with binary bits
    for (let i = 0; i < 100; i++) { // Adjust number of bits per column
        const bit = document.createElement('div');
        bit.classList.add('binary-text');
        bit.innerText = Math.random() < 0.5 ? '0' : '1';
        bit.style.fontSize = `${Math.random() * 4 + 8}px`; // Randomize initial size
        column.appendChild(bit);
    }

    // Remove column after animation completes to prevent overflow
    column.addEventListener('animationend', () => {
        column.remove();
    });
}

// Initialize Binary Columns
function initializeBinaryColumns() {
    for (let i = 0; i < columns; i++) {
        setInterval(() => {
            createBinaryColumn(i);
        }, Math.random() * 2000); // Random interval between columns
    }
}

// Start Binary Effect
function startBinaryEffect() {
    initializeBinaryColumns();
}

// Function to stop binary rain effect
function stopBinaryEffect() {
    clearInterval(binaryInterval);
    binaryContainer.innerHTML = '';
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
