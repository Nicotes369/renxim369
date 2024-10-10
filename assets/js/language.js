// assets/js/language.js

// Define RTL languages
const rtlLanguages = ['ar', 'he'];

// Language Selection and Content Loading
const languageSelect = document.getElementById('language-select');
let currentLanguage = 'en'; // Default language

let binaryCssLoaded = false;
let binaryJsLoaded = false;

function loadLanguage(lang) {
    fetch(`assets/languages/${lang}.json`)
        .then(response => response.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                if (data[key]) {
                    element.innerHTML = data[key];
                }
            });
            setDirection(lang);
        })
        .catch(error => {
            console.error(`Error loading language file: ${lang}.json`, error);
        });
}

function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
}

languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'qc') {
        document.body.classList.add('quantum-mode');
        // Load binary.css and binary.js
        if (!binaryCssLoaded) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/binary.css';
            link.id = 'binary-css';
            document.head.appendChild(link);
            binaryCssLoaded = true;
        }
        if (!binaryJsLoaded) {
            const script = document.createElement('script');
            script.src = 'assets/js/binary.js';
            script.id = 'binary-js';
            document.body.appendChild(script);
            binaryJsLoaded = true;
        }
    } else {
        document.body.classList.remove('quantum-mode');
        // Remove binary.css
        if (binaryCssLoaded) {
            const link = document.getElementById('binary-css');
            if (link) {
                link.remove();
                binaryCssLoaded = false;
            }
        }
        // Remove binary.js
        if (binaryJsLoaded) {
            const script = document.getElementById('binary-js');
            if (script) {
                script.remove();
                binaryJsLoaded = false;
            }
            // Stop the binary effect if it's running
            if (typeof window.stopBinaryEffect === 'function') {
                window.stopBinaryEffect();
            }
        }
    }
    // Load the selected language
    loadLanguage(selectedLanguage);
    // Show Language Change Notification
    showLanguageChangeNotification(selectedLanguage);
});

// Initial language load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLanguage);
});

// Show Language Change Notification
function showLanguageChangeNotification(lang) {
    const notification = document.createElement('div');
    if (lang === 'qc') {
        notification.innerText = `Quantum Computer Mode Activated`;
        notification.style.color = '#00ccff';
    } else {
        notification.innerText = `Language changed to ${getLanguageName(lang)}`;
    }
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    notification.style.color = '#ffffff';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    notification.style.zIndex = '1000';
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease';

    document.body.appendChild(notification);

    // Fade in
    setTimeout(() => {
        notification.style.opacity = '1';
    }, 100);

    // Fade out and remove
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Helper function to get language name
function getLanguageName(lang) {
    const languages = {
        'en': 'English',
        'ja': '日本語',
        'zh': '中文',
        'hi': 'Hindi',
        'fa': 'Persian',
        'ar': 'Arabic',
        'he': 'Hebrew',
        'ru': 'Russian',
        'de': 'German',
        'it': 'Italian',
        'es': 'Spanish',
        'ko': 'Korean',
        'qc': 'Quantum Computer'
    };
    return languages[lang] || lang;
}

/* Animation for notification */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeOut {
    0% { opacity: 1; }
    80% { opacity: 1; }
    100% { opacity: 0; }
}
`;
document.head.appendChild(style);
