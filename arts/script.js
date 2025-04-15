const API_BASE = 'https://194.242.100.155:7763';
let currentGenre = null;
let offset = 0;
const limit = 20;

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');

document.querySelectorAll('.genre-button').forEach(button => {
  button.addEventListener('click', () => {
    currentGenre = button.dataset.genre;
    offset = 0;
    gallery.innerHTML = '';
    loadImages();
  });
});

loadMoreBtn.addEventListener('click', () => {
  loadImages();
});

function loadImages() {
  if (!currentGenre) return;

  fetch(`${API_BASE}/api/images/${currentGenre}?offset=${offset}&limit=${limit}`)
    .then(res => res.json())
    .then(data => {
      data.images.forEach(image => {
        const card = document.createElement('div');
        card.classList.add('image-card');
        card.innerHTML = `
          <img src="${API_BASE}${image.url}" alt="image">
          <p>Загрузил: ${image.uploader}</p>
          <p>Просмотров: ${image.views}</p>
        `;
        gallery.appendChild(card);
      });

      offset += limit;

      // Показываем/скрываем кнопку
      if (data.hasMore) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'block'; // Не скрываем
      }
    })
    .catch(err => {
      console.error('Ошибка загрузки:', err);
    });
}
