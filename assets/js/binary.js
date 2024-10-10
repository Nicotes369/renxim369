// assets/js/binary.js

document.addEventListener('DOMContentLoaded', () => {
    const binaryContainer = document.getElementById('binary-container');
    const numColumns = Math.floor(window.innerWidth / 100); // 100px ごとに列を配置
    const streams = [];

    for (let i = 0; i < numColumns; i++) {
        const column = document.createElement('div');
        column.classList.add('binary-column');
        column.style.left = `${(i * 100) + 50}px`; // 各列を中央に配置
        binaryContainer.appendChild(column);

        const stream = document.createElement('div');
        stream.classList.add('binary-stream');
        const animationDuration = Math.random() * 5 + 5; // 5秒から10秒の間でランダム
        stream.style.animationDuration = `${animationDuration}s`;
        stream.style.animationDelay = `${Math.random() * 5}s`; // 遅延をランダム化

        // 文字列を縦に並べる
        for (let j = 0; j < 50; j++) { // 50文字ずつ
            const bit = document.createElement('span');
            bit.textContent = Math.random() < 0.5 ? '0' : '1';
            // サイズと透明度をランダム化
            const fontSize = Math.random() * 12 + 12; // 12pxから24px
            bit.style.fontSize = `${fontSize}px`;
            bit.style.opacity = `${Math.random() * 0.5 + 0.5}`;
            // 遠近感を表現するためのスケール
            const scale = 1 + (fontSize - 12) / 24; // 1から1.5の間
            bit.style.transform = `scale(${scale})`;
            stream.appendChild(bit);
        }

        column.appendChild(stream);
        streams.push(stream);
    }

    // リサイズ時にバイナリ列を再生成
    window.addEventListener('resize', () => {
        // Clear existing streams
        binaryContainer.innerHTML = '';
        streams.length = 0;

        const newNumColumns = Math.floor(window.innerWidth / 100);
        for (let i = 0; i < newNumColumns; i++) {
            const column = document.createElement('div');
            column.classList.add('binary-column');
            column.style.left = `${(i * 100) + 50}px`;
            binaryContainer.appendChild(column);

            const stream = document.createElement('div');
            stream.classList.add('binary-stream');
            const animationDuration = Math.random() * 5 + 5;
            stream.style.animationDuration = `${animationDuration}s`;
            stream.style.animationDelay = `${Math.random() * 5}s`;

            for (let j = 0; j < 50; j++) {
                const bit = document.createElement('span');
                bit.textContent = Math.random() < 0.5 ? '0' : '1';
                const fontSize = Math.random() * 12 + 12;
                bit.style.fontSize = `${fontSize}px`;
                bit.style.opacity = `${Math.random() * 0.5 + 0.5}`;
                const scale = 1 + (fontSize - 12) / 24;
                bit.style.transform = `scale(${scale})`;
                stream.appendChild(bit);
            }

            column.appendChild(stream);
            streams.push(stream);
        }
    });
});
