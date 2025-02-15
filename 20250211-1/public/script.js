document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.getElementById('breedSelect');
  const loadButton = document.getElementById('loadButton');
  const clearButton = document.getElementById('clearButton');
  const loading = document.getElementById('loading');
  const error = document.getElementById('error');
  const gallery = document.getElementById('gallery');

  const displayError = (response) => {
    if (!response.ok) {
      error.style.display = 'block';
      setTimeout(() => {
        error.style.display = 'none';
      }, 3000);
      return;
    }
  };

  async function getBreeds() {
    const response = await fetch('https://dog.ceo/api/breeds/list/all');
    displayError(response);

    const breeds = await response.json();

    console.log(breeds);

    return breeds;
  }

  async function getPhotos(num, breed) {
    const response = await fetch(
      `https://dog.ceo/api/breed/${breed}/images/random/${num}`
    );
    displayError(response);

    const imageURLs = await response.json();

    return imageURLs;
  }

  const setDataToDom = (data) => {
    const fragment = document.createDocumentFragment();
    Object.keys(data.message).forEach((key) => {
      const op = document.createElement('option');
      op.textContent = key;
      fragment.appendChild(op);
    });

    breedSelect.appendChild(fragment);
  };

  const displayPhotos = (imageURLs) => {
    const fragment = document.createDocumentFragment();
    imageURLs.forEach((url) => {
      const image = document.createElement('img');
      image.src = url;
      fragment.appendChild(image);
    });

    gallery.appendChild(fragment);
  };

  const breeds = await getBreeds();
  setDataToDom(breeds);

  loadButton.addEventListener('click', async () => {
    const breed = breedSelect.value;
    const imageURLs = await getPhotos(3, breed);
    console.log(imageURLs);
    displayPhotos(imageURLs.message);
  });

  clearButton.addEventListener('click', () => {
    gallery.innerHTML = '';
  });
});
