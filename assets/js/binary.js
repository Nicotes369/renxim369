// assets/js/binary.js

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('quantum-mode')) {
        startQuantumRain();
    }
});

// Function to start Quantum Binary Rain
function startQuantumRain() {
    const binaryContainer = document.getElementById('binary-container');
    if (!binaryContainer) return;

    const columns = Math.floor(window.innerWidth / 20); // Adjust based on column width
    for (let i = 0; i < columns; i++) {
        createBinaryColumn(i * 20);
    }

    // Adjust on window resize
    window.addEventListener('resize', () => {
        const newColumns = Math.floor(window.innerWidth / 20);
        if (newColumns > columns) {
            for (let i = columns; i < newColumns; i++) {
                createBinaryColumn(i * 20);
            }
        } else if (newColumns < columns) {
            for (let i = newColumns; i < columns; i++) {
                const column = document.getElementById(`binary-column-${i}`);
                if (column) binaryContainer.removeChild(column);
            }
        }
    });
}

// Function to create a binary column
function createBinaryColumn(leftPosition) {
    const binaryContainer = document.getElementById('binary-container');
    const column = document.createElement('div');
    column.classList.add('binary-column');
    column.id = `binary-column-${leftPosition}`;
    column.style.left = `${leftPosition}px`;

    // Randomize animation duration and delay
    const duration = Math.random() * 5 + 5; // 5s to 10s
    const delay = Math.random() * -20; // Negative delay for continuous effect
    column.style.animationDuration = `${duration}s`;
    column.style.animationDelay = `${delay}s`;

    // Create multiple quantum bits in the column
    const numberOfBits = Math.floor(Math.random() * 20) + 10; // 10 to 30 bits
    for (let i = 0; i < numberOfBits; i++) {
        const bit = document.createElement('span');
        bit.textContent = Math.random() < 0.5 ? '|0⟩' : '|1⟩';
        // Randomize font size for depth effect
        const fontSize = Math.random() * 10 + 10; // 10px to 20px
        bit.style.fontSize = `${fontSize}px`;
        column.appendChild(bit);
    }

    binaryContainer.appendChild(column);
}

// Function to stop Quantum Binary Rain
function stopQuantumRain() {
    const binaryContainer = document.getElementById('binary-container');
    if (!binaryContainer) return;
    binaryContainer.innerHTML = '';
}
