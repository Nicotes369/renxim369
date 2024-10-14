// assets/js/main.js

// コピー機能の強化とQuantum Computerモードとの連携
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.contract-address button');
    const addressElement = document.getElementById('contract-address');

    // コピー機能の追加
    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー完了時の発光効果を追加
            addressElement.classList.add('copied');

            // 現在の言語を取得し、コピー成功メッセージを生成
            const currentLang = document.documentElement.getAttribute('lang') || 'en';

            // 各言語に対応するコピー完了メッセージ
            const messages = {
                'en': 'Copy successful!',
                'ja': 'コピーが完了しました！',
                'zh': '复制成功！',
                'hi': 'कॉपी सफल!',
                'fa': 'کپی با موفقیت انجام شد!',
                'ar': 'تم النسخ بنجاح!',
                'he': 'ההעתקה הושלמה!',
                'ru': 'Копирование завершено!',
                'de': 'Kopieren erfolgreich!',
                'it': 'Copia riuscita!',
                'es': '¡Copia exitosa!',
                'ko': '복사 완료!'
            };

            // 確認メッセージの要素を作成
            const confirmation = document.createElement('span');
            confirmation.classList.add('copy-confirmation');
            confirmation.innerText = ` ${messages[currentLang] || messages['en']}`;
            addressElement.parentElement.appendChild(confirmation);

            // 2秒後に発光効果とメッセージを削除
            setTimeout(() => {
                addressElement.classList.remove('copied');
                confirmation.remove();
            }, 2000);
        }).catch(err => {
            // コピー失敗時のアラート
            alert('アドレスのコピーに失敗しました。');
            console.error('Error copying text: ', err);
        });
    });

    // Quantum Computerモードでのスクロール制御
    const languageSelect = document.getElementById('language-select');
    const originalOverflow = document.body.style.overflow;

    languageSelect.addEventListener('change', function() {
        if (this.value === 'qc') {
            document.body.classList.add('quantum-mode');
            disableScroll();
        } else {
            document.body.classList.remove('quantum-mode');
            enableScroll();
        }
    });

    // ページ読み込み時にQuantum Computerモードが選択されている場合の処理
    if (languageSelect.value === 'qc') {
        document.body.classList.add('quantum-mode');
        disableScroll();
    }

    // Binary Rain Effect using Canvas for enhanced performance and visual effects
    let canvas, ctx;
    let columns;
    let drops = [];
    const baseFontSize = 20; // Increased font size
    const binaryBits = ['0⟩', '1⟩'];
    const neonWhiteProbability = 0.05; // 5% of bits will have white neon
    let animationId;

    function initializeCanvas() {
        canvas = document.createElement('canvas');
        canvas.id = 'binary-canvas';
        document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        initializeDrops();
        animate();
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / baseFontSize);
        drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    function initializeDrops() {
        for (let x = 0; x < columns; x++) {
            drops[x] = Math.random() * canvas.height;
        }
    }

    function draw() {
        // Black background with slight opacity for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font properties
        ctx.font = `${baseFontSize}px 'Orbitron', sans-serif`;

        // Draw binary bits
        for (let i = 0; i < drops.length; i++) {
            // Determine if this bit should be white neon
            const isWhiteNeon = Math.random() < neonWhiteProbability;
            if (isWhiteNeon) {
                ctx.fillStyle = '#ffffff'; // White neon
                ctx.shadowColor = '#ffffff';
                ctx.shadowBlur = 20;
            } else {
                ctx.fillStyle = '#00ccff'; // Neon Blue
                ctx.shadowColor = '#00ccff';
                ctx.shadowBlur = 15;
            }

            const bit = binaryBits[Math.floor(Math.random() * binaryBits.length)];
            ctx.fillText(bit, i * baseFontSize, drops[i] * baseFontSize);

            // Reset shadow for next character
            ctx.shadowBlur = 0;

            // Reset drop to top after it reaches the bottom with increased delay
            if (drops[i] * baseFontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    function animate() {
        draw();
        animationId = requestAnimationFrame(animate);
    }

    function startBinaryRain() {
        if (!canvas) {
            initializeCanvas();
        }
    }

    function stopBinaryRain() {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (canvas) {
            canvas.remove();
            canvas = null;
            ctx = null;
        }
    }

    // Listen for Quantum Computer mode activation/deactivation
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                if (document.body.classList.contains('quantum-mode')) {
                    startBinaryRain();
                    disableScroll();
                } else {
                    stopBinaryRain();
                    enableScroll();
                }
            }
        });
    });

    observer.observe(document.body, { attributes: true });

    // Initialize on page load if Quantum Computer mode is active
    if (document.body.classList.contains('quantum-mode')) {
        startBinaryRain();
        disableScroll();
    }

    // Function to disable scroll
    function disableScroll() {
        document.body.style.overflow = 'hidden';
    }

    // Function to enable scroll
    function enableScroll() {
        document.body.style.overflow = 'auto';
    }
});
