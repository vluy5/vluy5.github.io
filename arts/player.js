const video = document.getElementById('video');
const playBtn = document.getElementById('playBtn');
const pauseBtn = document.getElementById('pauseBtn');
const volumeSlider = document.getElementById('volumeSlider');

// IP адрес сервера
const SERVER_IP = 'http://194.242.100.155:3567';

let lastPausedState = null; // Запоминаем состояние

function loadStream() {
    fetch(`${SERVER_IP}/status`)
        .then(res => res.json())
        .then(status => {
            if (status.stopped) {
                video.pause();
                video.src = '';
                document.getElementById('live-label').innerText = 'Поток остановлен';
                lastPausedState = null;
            } else {
                if (status.paused) {
                    video.pause();
                    document.getElementById('live-label').innerText = 'Пауза';
                    lastPausedState = true;
                } else {
                    document.getElementById('live-label').innerText = 'LIVE';
                    // Только если было пауза, обновляем src
                    if (lastPausedState !== false) {
                        video.src = `${SERVER_IP}/stream?t=${Date.now()}`; // Добавляем метку времени чтобы избежать кеша
                        video.play().catch(err => console.error('Ошибка воспроизведения:', err));
                        lastPausedState = false;
                    }
                }
            }
        })
        .catch((err) => {
            console.error('Ошибка подключения к серверу:', err);
            document.getElementById('live-label').innerText = 'Нет связи';
            video.pause();
        });
}

// Проверка статуса каждые 3 секунды
setInterval(loadStream, 3000);

// Управление пользователем
playBtn.addEventListener('click', () => {
    video.play();
});

pauseBtn.addEventListener('click', () => {
    video.pause();
});

volumeSlider.addEventListener('input', () => {
    video.volume = volumeSlider.value;
});

// Изначальная загрузка
loadStream();
video.volume = volumeSlider.value; // Установка начального значения громкости
video.addEventListener('error', (e) => {
    console.error('Ошибка воспроизведения:', e);
    document.getElementById('live-label').innerText = 'Ошибка воспроизведения';
});
video.addEventListener('playing', () => {
    document.getElementById('live-label').innerText = 'LIVE';
}   );
video.addEventListener('pause', () => {
    document.getElementById('live-label').innerText = 'Пауза';
});
