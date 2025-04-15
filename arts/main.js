const API_BASE = 'https://194.242.100.155:443';
let offset = 0;
let genre = 'main';
let loading = false;

async function loadImages(reset = false) {
  if (loading) return;
  loading = true;

  if (reset) {
    document.getElementById('gallery').innerHTML = '';
    offset = 0;
  }

  try {
    const res = await fetch(`${API_BASE}/api/images?offset=${offset}&limit=20&genre=${genre}`);
    const data = await res.json();

    if (data.images && data.images.length > 0) {
      data.images.forEach(image => {
        const div = document.createElement('div');
        div.className = 'image-card';

        const img = document.createElement('img');
        img.src = `${API_BASE}${image.url}`;
        img.alt = 'art';
        div.appendChild(img);

        const info = document.createElement('div');
        info.className = 'info';
        info.innerText = `Загрузил: ${image.uploader} | Просмотров: ${image.views} | ${image.date}`;
        div.appendChild(info);

        document.getElementById('gallery').appendChild(div);
      });

      offset += data.images.length;
    }

  } catch (e) {
    console.error('Ошибка загрузки:', e);
  }

  loading = false;
}

document.getElementById('loadMore').addEventListener('click', () => loadImages());
document.getElementById('mainBtn').addEventListener('click', () => { genre = 'main'; loadImages(true); });
document.getElementById('recentBtn').addEventListener('click', () => { genre = 'recent'; loadImages(true); });

// Автозагрузка первых 20
loadImages(true);
