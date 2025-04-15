async function loadGenre(genre) {
    const gallery = document.getElementById('gallery');
    gallery.innerHTML = 'Загрузка...';
    try {
      const res = await fetch(`/api/images/${genre}`);
      const data = await res.json();
      gallery.innerHTML = '';
      data.forEach(img => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
          <img src="${img.url}" alt="image">
          <p>Загрузил: ${img.uploader}</p>
          <p>Просмотров: ${img.views}</p>
        `;
        gallery.appendChild(div);
      });
    } catch (err) {
      gallery.innerHTML = 'Ошибка загрузки изображений.';
    }
  }