// assets/js/main.js

// Function to copy contract address to clipboard
function copyAddress() {
    const addressElement = document.getElementById('contract-address');
    const addressText = addressElement.innerText.split(': ')[1];
    navigator.clipboard.writeText(addressText).then(() => {
        showCopyNotification();
    }).catch(err => {
        alert('Failed to copy address.');
        console.error('Error copying text: ', err);
    });
}

// Function to show copy notification
function showCopyNotification() {
    const notification = document.createElement('div');
    notification.innerText = 'Address Copied!';
    notification.classList.add('copy-notification');
    document.body.appendChild(notification);

    // Style the notification
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = '#040488';
    notification.style.color = '#ffffff';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    notification.style.zIndex = '1000';
    notification.style.fontFamily = 'Orbitron, sans-serif';
    notification.style.fontSize = '16px';
    notification.style.opacity = '1';
    notification.style.transition = 'opacity 0.5s ease-in-out';

    // Fade out and remove the notification
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Event listener for social icons hover effect
document.addEventListener('DOMContentLoaded', () => {
    const socialIcons = document.querySelectorAll('.social-icon-link');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1)';
            icon.style.transition = 'transform 0.3s ease';
        });
    });

    // Responsive Navigation Fix
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            document.querySelector('.language-selector').style.fontSize = '14px';
        } else {
            document.querySelector('.language-selector').style.fontSize = '16px';
        }
    });
});
