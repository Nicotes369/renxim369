// assets/js/main.js

// Copy Contract Address Function
function copyAddress() {
    const addressElement = document.getElementById('contract-address');
    const addressText = addressElement.innerText.split(': ')[1];
    navigator.clipboard.writeText(addressText).then(() => {
        showCopyNotification();
    }).catch(err => {
        alert('Failed to copy the contract address');
        console.error('Error copying text: ', err);
    });
}

// Show Copy Notification
function showCopyNotification() {
    const notification = document.createElement('div');
    notification.innerText = 'Address Copied!';
    notification.className = 'copy-notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Event listener for social icons hover effect
const socialIcons = document.querySelectorAll('.social-icon-link');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1)';
    });
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1)';
    });
});

// Responsive Navigation Fix
window.addEventListener('resize', function() {
    const langSelector = document.querySelector('.language-selector');
    if (window.innerWidth <= 768) {
        langSelector.style.fontSize = '14px';
    } else {
        langSelector.style.fontSize = '16px';
    }
});
