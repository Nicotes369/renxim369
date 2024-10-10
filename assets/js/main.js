// assets/js/main.js

// Copy Contract Address Function with Glow and Confirmation Message
function copyAddress() {
    const addressElement = document.getElementById('contract-address');
    const address = addressElement.innerText.split(': ')[1];
    navigator.clipboard.writeText(address).then(() => {
        // Add glow effect
        addressElement.classList.add('copied');
        
        // Show confirmation message
        const confirmation = document.createElement('span');
        confirmation.classList.add('copy-confirmation');
        confirmation.innerText = ' コピーが完了しました';
        addressElement.appendChild(confirmation);
        
        // Remove effects after 2 seconds
        setTimeout(() => {
            addressElement.classList.remove('copied');
            confirmation.remove();
        }, 2000);
    }).catch(err => {
        alert('アドレスのコピーに失敗しました。');
        console.error('Error copying text: ', err);
    });
}
