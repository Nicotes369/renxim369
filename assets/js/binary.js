// assets/js/binary.js

// Initialize Binary Columns
function initializeBinaryColumns() {
    const binaryContainer = document.getElementById('binary-container');

    // Define the number of columns based on screen width and desired density
    const fontSize = 16; // Base font size
    const columns = Math.floor(window.innerWidth / (fontSize * 1.5));
    
    for (let i = 0; i < columns; i++) {
        createBinaryColumn(i, columns);
    }

    // Adjust columns on window resize
    window.addEventListener('resize', () => {
        const newColumns = Math.floor(window.innerWidth / (fontSize * 1.5));
        if (newColumns > columns) {
            for (let i = columns; i < newColumns; i++) {
                createBinaryColumn(i, newColumns);
            }
        } else if (newColumns < columns) {
            for (let i = newColumns; i < columns; i++) {
                const column = document.querySelector(`.binary-column[data-index='${i}']`);
                if (column) column.remove();
            }
        }
    });
}

// Function to create a binary column
function createBinaryColumn(index, totalColumns) {
    const binaryContainer = document.getElementById('binary-container');
    const column = document.createElement('div');
    column.classList.add('binary-column');
    column.setAttribute('data-index', index);
    column.style.left = `${(index / totalColumns) * 100}%`;
    column.style.animationDuration = `${Math.random() * 3 + 2}s`; // Randomize speed

    // Generate a stream of binary bits
    for (let i = 0; i < 50; i++) { // Number of bits per column
        const bit = document.createElement('div');
        bit.classList.add('binary-text');
        bit.innerText = Math.random() < 0.5 ? '0' : '1';
        bit.style.fontSize = `${Math.random() * 4 + 8}px`; // Randomize initial size
        bit.style.transform = `translateZ(${Math.random() * 100}px) scale(${Math.random() * 0.5 + 0.75})`; // Perspective scaling
        column.appendChild(bit);
    }

    binaryContainer.appendChild(column);

    // Remove column after animation completes to prevent overflow
    column.addEventListener('animationend', () => {
        column.remove();
    });
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
