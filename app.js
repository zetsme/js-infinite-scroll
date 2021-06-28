const imageContainer = document.querySelector('.image-container');

const limit = 10;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let page = 1;
let photosArr = [];

const apiKey = '18730377-c879a53c2c4e973a6a198c759';

const getPhotos = async () => {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${apiKey}&per_page=${limit}&page=${page}`
    );
    const { hits } = await res.json();
    photosArr = hits;
    dispalyPhotos();
  } catch (error) {
    console.log(error);
  }
};

const dispalyPhotos = () => {
  imagesLoaded = 0;
  totalImages = photosArr.length;
  photosArr.forEach(createImage);
};

const createImage = ({ pageURL, tags, webformatURL }) => {
  const item = document.createElement('a');
  setAttr(item, { href: pageURL, target: '_blank' });
  const img = document.createElement('img');
  setAttr(img, { src: webformatURL, alt: tags, title: tags });

  img.addEventListener('load', imageLoaded);

  item.appendChild(img);
  imageContainer.appendChild(item);
};

const imageLoaded = () => {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
  }
};

const setAttr = (element, attrs) => {
  for (const key in attrs) {
    element.setAttribute(key, attrs[key]);
  }
};

window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    ready = false;
    page++;
    getPhotos();
  }
});

getPhotos();
