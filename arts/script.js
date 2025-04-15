const API_BASE = 'https://194.242.100.155:443';
let offset = 0;
let tab = 'main';
let loading = false;

function loadTab(newTab) {
  tab = newTab;
  offset = 0;
  document.getElementById('gallery').innerHTML = '';
  document.getElementById('loadMoreBtn').style.display = 'block';
  loadImages();
}

function loadMore() {
  if (!loading) loadImages();
}

async function loadImages() {
  loading = true;
  try {
    let url = tab === 'main'
      ? `${API_BASE}/api/images/main?offset=${offset}&limit=20`
      : `${API_BASE}/api/images/recent`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.images.length) {
      document.getElementById('loadMoreBtn').style.display = 'none';
    }

    for (const image of data.images) {
      const div = document.createElement('div');
      div.className = 'image-card';
      div.innerHTML = `
        <img src="${API_BASE}${image.url}" alt="картинка">
        <p>Просмотров: ${image.views}</p>
      `;
      document.getElementById('gallery').appendChild(div);
    }

    if (tab === 'main') offset += 20;
    if (!data.hasMore && tab === 'main') {
      document.getElementById('loadMoreBtn').style.display = 'none';
    }
  } catch (err) {
    console.error('Ошибка загрузки:', err);
  } finally {
    loading = false;
  }
}

// Загружаем при первом открытии
loadTab('main');
