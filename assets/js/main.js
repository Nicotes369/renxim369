// assets/js/main.js

// コピー機能の強化とQuantum Computerモードとの連携
document.addEventListener('DOMContentLoaded', () => {
    const copyButton = document.querySelector('.contract-address button');
    const addressElement = document.getElementById('contract-address');

    copyButton.addEventListener('click', () => {
        const address = addressElement.innerText.trim();
        navigator.clipboard.writeText(address).then(() => {
            // コピー完了時の発光効果を追加
            addressElement.classList.add('copied');

            // 現在の言語を取得
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

            // メッセージを作成
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
});
