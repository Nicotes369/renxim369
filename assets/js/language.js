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
        // Hide all other content except binary-container and qc-content
        document.getElementById('main-content').style.display = 'none';
        if (!document.getElementById('qc-content')) {
            const qcContent = document.createElement('div');
            qcContent.id = 'qc-content';
            qcContent.style.position = 'fixed';
            qcContent.style.top = '0';
            qcContent.style.left = '0';
            qcContent.style.width = '100%';
            qcContent.style.height = '100%';
            qcContent.style.backgroundColor = '#000000';
            qcContent.style.zIndex = '1000';
            qcContent.style.pointerEvents = 'none';
            document.body.appendChild(qcContent);
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
        // Show main content
        document.getElementById('main-content').style.display = 'block';
        // Remove qc-content if exists
        const qcContent = document.getElementById('qc-content');
        if (qcContent) {
            qcContent.remove();
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
        notification.innerText = `Quantum Computer Mode Activated`;
        notification.style.color = '#00ccff';
    } else {
        notification.innerText = `Language changed to ${getLanguageName(lang)}`;
    }
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = 'rgba(4, 4, 140, 0.9)';
    notification.style.color = '#ffffff';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0px 0px 15px rgba(0, 0, 255, 0.7)';
    notification.style.zIndex = '1000';
    notification.style.fontFamily = "'Orbitron', sans-serif";
    notification.style.fontSize = '16px';
    notification.style.transition = 'opacity 0.5s ease-out';
    document.body.appendChild(notification);

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
