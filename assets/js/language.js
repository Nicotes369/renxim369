// assets/js/language.js

// Define RTL languages
const rtlLanguages = ['ar', 'he'];

// Language Selection and Content Loading
const languageSelect = document.getElementById('language-select');
let currentLanguage = 'en'; // Default language

let binaryCssLoaded = false;
let binaryJsLoaded = false;

// Load Language Function
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

// Set Text Direction
function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
}

// Handle Language Change
languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'qc') {
        document.body.classList.add('quantum-mode');
        // Dynamically load binary.css if not already loaded
        if (!binaryCssLoaded) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'assets/css/binary.css';
            link.id = 'binary-css';
            document.head.appendChild(link);
            binaryCssLoaded = true;
        }
        // Dynamically load binary.js if not already loaded
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
        // Load the selected language
        loadLanguage(selectedLanguage);
    }
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
        notification.innerText = `Quantum Computer mode activated`;
    } else {
        notification.innerText = `Language changed to ${getLanguageName(lang)}`;
    }
    notification.className = 'language-notification';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Helper function to get language name
function getLanguageName(lang) {
    const languageNames = {
        en: 'English',
        ja: '日本語',
        zh: '中文',
        hi: 'हिंदी',
        fa: 'فارسی',
        ar: 'العربية',
        he: 'עברית',
        ru: 'Русский',
        de: 'Deutsch',
        it: 'Italiano',
        es: 'Español',
        ko: '한국어',
        qc: 'Quantum Computer'
    };
    return languageNames[lang] || lang;
}
