// assets/js/main.js

// Copy Contract Address Function with Enhanced Error Handling
function copyAddress() {
    const addressElement = document.getElementById('contract-address');
    if (!addressElement) {
        console.error('Contract address element not found.');
        return;
    }
    const address = addressElement.innerText.split(': ')[1];
    if (!address) {
        console.error('Contract address not found.');
        return;
    }
    navigator.clipboard.writeText(address).then(() => {
        showCopyNotification();
    }).catch(err => {
        showCopyErrorNotification();
        console.error('Error copying text: ', err);
    });
}

// Show Copy Notification
function showCopyNotification() {
    const notification = document.createElement('div');
    notification.innerText = 'Address Copied!';
    notification.className = 'notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Show Copy Error Notification
function showCopyErrorNotification() {
    const notification = document.createElement('div');
    notification.innerText = 'Failed to copy the contract address.';
    notification.className = 'notification error';
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

// Responsive Navigation Fix with Debounce
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('resize', debounce(function() {
    const languageSelector = document.querySelector('.language-selector');
    if (window.innerWidth <= 768) {
        languageSelector.style.fontSize = '14px';
    } else {
        languageSelector.style.fontSize = '16px';
    }
}, 200));

// Keyboard Navigation Support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Ensure focus is visible
        document.body.classList.add('user-is-tabbing');
    }
});

// Ensure all interactive elements are focusable
const interactiveElements = document.querySelectorAll('button, [href], select, input, textarea, [tabindex]:not([tabindex="-1"])');
interactiveElements.forEach(el => {
    if (!el.hasAttribute('tabindex')) {
        el.setAttribute('tabindex', '0');
    }
});
