// assets/js/language.js

// Define RTL languages
const rtlLanguages = ['ar', 'he'];

// Language Selection and Content Loading
const languageSelect = document.getElementById('language-select');
let currentLanguage = 'en'; // Default language

let binaryCssLoaded = false;
let binaryJsLoaded = false;

// Function to load language JSON files
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

// Function to set text direction based on language
function setDirection(lang) {
    if (rtlLanguages.includes(lang)) {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', lang);
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', lang);
    }
}

// Function to show language change notifications
function showLanguageChangeNotification(lang) {
    const notification = document.createElement('div');
    if (lang === 'qc') {
        notification.innerText = getLocalizedMessage('qcModeActivated', lang);
        notification.style.color = '#00ccff';
    } else {
        notification.innerText = getLocalizedMessage('languageChanged', lang, getLanguageName(lang));
    }
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.padding = '10px 20px';
    notification.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    notification.style.color = '#ffffff';
    notification.style.borderRadius = '5px';
    notification.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    notification.style.zIndex = '1002';
    notification.style.fontFamily = "'Orbitron', sans-serif";
    notification.style.fontSize = '16px';
    notification.style.animation = 'fadeInOut 3s forwards';
    document.body.appendChild(notification);

    // Remove notification after animation completes
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Function to get language-specific messages
function getLocalizedMessage(key, lang, additionalInfo = '') {
    const messages = {
        'qcModeActivated': {
            'en': 'Quantum Computer Mode Activated',
            'ja': 'Quantum Computerモードが有効になりました',
            'zh': '量子计算机模式已激活',
            'hi': 'क्वांटम कंप्यूटर मोड सक्रिय',
            'fa': 'حالت رایانه کوانتومی فعال شد',
            'ar': 'تم تفعيل وضع الكمبيوتر الكوانتي',
            'he': 'מצב מחשב קוונטי הופעל',
            'ru': 'Режим квантового компьютера активирован',
            'de': 'Quantum-Computer-Modus aktiviert',
            'it': 'Modalità Quantum Computer attivata',
            'es': 'Modo Quantum Computer activado',
            'ko': '퀀텀 컴퓨터 모드가 활성화되었습니다'
        },
        'languageChanged': {
            'en': `Language changed to ${additionalInfo}`,
            'ja': `${additionalInfo} に言語が変更されました`,
            'zh': `语言已更改为 ${additionalInfo}`,
            'hi': `${additionalInfo} में भाषा बदल गई`,
            'fa': `زبان به ${additionalInfo} تغییر یافت`,
            'ar': `تم تغيير اللغة إلى ${additionalInfo}`,
            'he': `השפה שונתה ל-${additionalInfo}`,
            'ru': `Язык изменен на ${additionalInfo}`,
            'de': `Sprache auf ${additionalInfo} geändert`,
            'it': `Lingua cambiata in ${additionalInfo}`,
            'es': `Idioma cambiado a ${additionalInfo}`,
            'ko': `${additionalInfo}로 언어가 변경되었습니다`
        }
    };

    return messages[key][lang] || messages[key]['en'];
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

// Event listener for language selection
languageSelect.addEventListener('change', function() {
    const selectedLanguage = this.value;
    if (selectedLanguage === 'qc') {
        document.body.classList.add('quantum-mode');
        // Hide main content
        document.getElementById('main-content').style.display = 'none';
        // Load Quantum Computer mode
        activateQuantumMode();
    } else {
        document.body.classList.remove('quantum-mode');
        // Show main content
        document.getElementById('main-content').style.display = 'block';
        // Deactivate Quantum Computer mode
        deactivateQuantumMode();
        // Load selected language
        loadLanguage(selectedLanguage);
    }
    // Show notification
    showLanguageChangeNotification(selectedLanguage);
});

// Function to activate Quantum Computer mode
function activateQuantumMode() {
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
}

// Function to deactivate Quantum Computer mode
function deactivateQuantumMode() {
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

// Initial language load
document.addEventListener('DOMContentLoaded', () => {
    loadLanguage(currentLanguage);
});

// MutationObserver to handle class changes on body
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
            const bodyClassList = document.body.classList;
            if (bodyClassList.contains('quantum-mode')) {
                activateQuantumMode();
            } else {
                deactivateQuantumMode();
            }
        }
    });
});

// Observe changes to the body class
observer.observe(document.body, { attributes: true });

// Animation for notification fade in and out
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeInOut {
    0% { opacity: 0; transform: translateY(20px); }
    10% { opacity: 1; transform: translateY(0); }
    90% { opacity: 1; transform: translateY(0); }
    100% { opacity: 0; transform: translateY(20px); }
}
`;
document.head.appendChild(style);
