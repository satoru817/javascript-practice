class CatManager {
  constructor() {
    this.cats = this.loadCats();
  }

  loadCats() {
    const json_cats = localStorage.getItem('cats');
    return json_cats != null ? JSON.parse(json_cats) : [];
  }

  save() {
    localStorage.setItem('cats', JSON.stringify(this.cats));
  }

  isDuplicate(id) {
    return this.cats.find((cat) => cat.id === id) != null;
  }

  deleteById(id) {
    console.log(id);
    this.cats = this.cats.filter((cat) => cat.id !== id);
    this.save();
  }

  create(id, url, breed) {
    const cat = { id: id, url: url, breed, breed };
    this.cats.push(cat);
    this.save();
    return cat;
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const apiKey = CONFIG.API_KEY;
  const loadMores = document.querySelectorAll('.loadMore');
  const showFavorites = document.getElementById('showFavorites');
  const totalCount = document.getElementById('totalCount');
  const gallery = document.getElementById('gallery');
  const loading = document.getElementById('loading');
  const manager = new CatManager();

  const getImageURLs = async (num) => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=${num}&api_key=${apiKey}` //?limit=${num}?api_key=${apiKey}とは書かない。&でつなぐこと
    );
    const data = await response.json();
    console.log(data);
    return data;
  };

  const createImageDOMFromDatum = (datum) => {
    const div = document.createElement('div');
    div.className = 'cat-card';
    const img = document.createElement('img');
    img.src = datum.url;
    img.className = 'cat-image';
    div.appendChild(img);
    const breedName = datum.breed;
    if (breedName != 'false') {
      const description = document.createElement('div');
      description.className = 'text-overlay';
      description.textContent = breedName;
      div.appendChild(description);
    }

    const button = document.createElement('button');
    button.textContent = 'お気に入り';
    button.className = 'favorite-btn';
    button.classList.add('favorite');
    button.dataset.url = datum.url;
    button.dataset.id = datum.id;
    button.dataset.breed = breedName;
    div.appendChild(button);

    return div;
  };

  const setDOMFromData = (data) => {
    const fragment = document.createDocumentFragment();
    data.forEach((datum) => {
      fragment.appendChild(createImageDOMFromDatum(datum));
    });
    gallery.appendChild(fragment);
  };

  showFavorites.addEventListener('click', () => {
    setDOMFromData(manager.cats);
    totalCount.textContent =
      parseInt(totalCount.textContent) + manager.cats.length;
  });

  loadMores.forEach((button) => {
    button.addEventListener('click', async () => {
      const data = await getImageURLs(6);
      const fragment = document.createDocumentFragment();
      data.forEach((datum) => {
        console.log(datum.url);

        const div = document.createElement('div');
        div.className = 'cat-card';
        const img = document.createElement('img');
        img.src = datum.url;
        img.className = 'cat-image';
        div.appendChild(img);

        //品種名登録
        const breedName = datum?.breeds?.[0]?.name || false;
        if (breedName) {
          const description = document.createElement('div');
          description.className = 'text-overlay';
          description.textContent = breedName;
          div.appendChild(description);
        }

        const button = document.createElement('button');
        button.textContent = 'お気に入り';
        button.className = 'favorite-btn';
        button.dataset.url = datum.url;
        button.dataset.id = datum.id;
        button.dataset.breed = breedName;
        div.appendChild(button);

        fragment.appendChild(div);
      });

      gallery.appendChild(fragment);
      totalCount.textContent = parseInt(totalCount.textContent) + 6;
    });
  });

  gallery.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('favorite-btn')) {
      if (target.classList.contains('favorite')) {
        manager.deleteById(target.dataset.id);
        const img = target.parentElement;
        img.remove();
      } else {
        if (manager.isDuplicate(target.dataset.id)) {
          alert('すでにお気に入りです');
        } else {
          const cat = manager.create(
            target.dataset.id,
            target.dataset.url,
            target.dataset.breed
          );
          target.classList.add('favorite');
        }
      }
    }
  });
});
