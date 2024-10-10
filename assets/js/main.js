// assets/js/main.js

// Copy Contract Address Function
function copyAddress() {
    const address = document.getElementById('contract-address').innerText;
    navigator.clipboard.writeText(address).then(() => {
        // Add glow effect to contract-box
        const contractBox = document.querySelector('.contract-box');
        contractBox.classList.add('glow');

        // Remove glow after animation
        setTimeout(() => {
            contractBox.classList.remove('glow');
        }, 1000);

        // Show copy completion message
        showCopyMessage();
    }).catch(err => {
        alert('Failed to copy address.');
        console.error('Error copying text: ', err);
    });
}

// Show Copy Completion Message
function showCopyMessage() {
    const message = document.createElement('div');
    message.innerText = 'コピーが完了しました';
    message.style.position = 'fixed';
    message.style.top = '20px';
    message.style.right = '20px';
    message.style.padding = '10px 20px';
    message.style.backgroundColor = 'rgba(0, 204, 255, 0.9)';
    message.style.color = '#ffffff';
    message.style.borderRadius = '5px';
    message.style.boxShadow = '0px 0px 10px rgba(0, 204, 255, 0.5)';
    message.style.zIndex = '1001';
    message.style.opacity = '0';
    message.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(message);

    // Fade in
    setTimeout(() => {
        message.style.opacity = '1';
    }, 100);

    // Fade out and remove
    setTimeout(() => {
        message.style.opacity = '0';
        setTimeout(() => {
            message.remove();
        }, 500);
    }, 2000);
}

/* Glow Effect for Contract Box */
const style = document.createElement('style');
style.innerHTML = `
.contract-box.glow {
    box-shadow: 0 0 20px #00ccff, 0 0 30px #00ccff, 0 0 40px #0099cc;
    transition: box-shadow 0.5s ease;
}
`;
document.head.appendChild(style);
