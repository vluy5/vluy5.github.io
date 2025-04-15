let page = 0;
let currentGenre = '';
const gallery = document.getElementById('gallery');

async function loadImages(genre, reset = true) {
  currentGenre = genre;
  if (reset) {
    page = 0;
    gallery.innerHTML = '';
  }
  const res = await fetch(`http://194.242.100.155:7763/api/images?genre=${genre}`);
  const images = await res.json();

  images.forEach(image => {
    const card = document.createElement('div');
    card.className = 'image-card';
    card.innerHTML = `
      <img src="http://194.242.100.155:7763${image}" alt="image" onclick="registerView('${genre}', '${image.split('/').pop()}')">
      <p>Загрузил: Админ</p>
    `;
    gallery.appendChild(card);
  });
}

function registerView(genre, image) {
  fetch(`http://194.242.100.155:7763/api/view/${genre}/${image}`);
}

window.onscroll = () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
    page++;
    loadImages(currentGenre, false);
  }
};

loadImages('a0');
