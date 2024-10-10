// assets/js/binary.js
// Function to create binary streams
function startBinaryEffect() {
    const binaryContainer = document.getElementById('binary-container') || document.createElement('div');
    binaryContainer.id = 'binary-container';
    document.body.appendChild(binaryContainer);

    const createBinaryStream = () => {
        const stream = document.createElement('div');
        stream.classList.add('binary-stream');
        stream.style.left = `${Math.random() * 100}%`;
        stream.style.animationDuration = `${Math.random() * 5 + 5}s`; // 5sから10sの間
        stream.style.animationDelay = `${Math.random() * 5}s`;

        // 数字の縦並びを生成
        const numberOfDigits = Math.floor(Math.random() * 20) + 10; // 10から30の間
        for (let i = 0; i < numberOfDigits; i++) {
            const binary = document.createElement('span');
            binary.classList.add('binary-text');
            binary.innerText = Math.random() < 0.5 ? '0' : '1';
            binary.style.fontSize = `${Math.random() * 8 + 12}px`; // 12pxから20pxの間
            stream.appendChild(binary);
        }

        binaryContainer.appendChild(stream);

        // ストリームがアニメーション終了後に削除
        setTimeout(() => {
            stream.remove();
        }, (parseFloat(stream.style.animationDuration) + parseFloat(stream.style.animationDelay)) * 1000);
    };

    // ストリームを一定間隔で生成
    const streamInterval = setInterval(createBinaryStream, 500); // 0.5秒ごと
    window.streamInterval = streamInterval;
}

// Function to stop binary streams
function stopBinaryEffect() {
    const binaryContainer = document.getElementById('binary-container');
    if (binaryContainer) {
        binaryContainer.remove();
    }
    if (window.streamInterval) {
        clearInterval(window.streamInterval);
        window.streamInterval = null;
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
