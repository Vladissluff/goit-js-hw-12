import { renderImages } from "./js/render-functions";
import { fetchImages } from "./js/pixabay-api";

import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector(`form`);
const gallery = document.querySelector(`.gallery`);
const loader = document.querySelector(`.loader`);
const loadBtn = document.querySelector('.load-more-btn');

let limit = 15;
let page = 1;
let lastQuery;
let totalCountOfResult;

loadBtn.classList.add('hidden');

iziToast.settings({
  position: 'topRight',
});

form.addEventListener(`submit`, async (event) => {
  event.preventDefault();

  const query = event.target.elements[`search-text`].value.trim();
  if (!query) {
    iziToast.error({ title: `Error`, message: `Please enter a search query!` });
    return;
  }

  if (query !== lastQuery) {
    lastQuery = query;
    page = 1;
  }

  gallery.innerHTML = ``;
  loader.classList.add(`visible`);
  loadBtn.classList.add('hidden');

  try {
    const data = await fetchImages(query, limit, page);
    totalCountOfResult = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({ title: "Oops!", message: "No images found. Try again!" });
    } else {
      renderImages(data.hits);
      if (data.hits.length === limit) {
        loadBtn.classList.remove("hidden");
      }
    }
  } catch (error) {
    iziToast.error({ title: "Error", message: "Failed to fetch images. Try again later!" });
  } finally {
    loader.classList.remove("visible");
    form.reset();
  }
});

loadBtn.addEventListener('click', async () => {
  loadBtn.classList.add('hidden');
  loader.classList.add('visible');

  page += 1;

  try {
    const data = await fetchImages(lastQuery, limit, page);
    if (data.hits.length > 0) {
      renderImages(data.hits, false);
      scrollDown('.gallery-item', 3);
    }

    if (page * limit >= totalCountOfResult) {
      loadBtn.classList.add('hidden');
      iziToast.info({ message: "No more images to load!" });
    } else {
      loadBtn.classList.remove('hidden');
    }
  } catch (error) {
    iziToast.error({ message: error.message });
  } finally {
    loader.classList.remove('visible');
  }
});

function scrollDown(itemSelector, countOfItem) {
  const item = document.querySelector(itemSelector);
  if (item) {
    const itemHeight = item.getBoundingClientRect().height;
    window.scrollBy({
      top: itemHeight * countOfItem,
      behavior: 'smooth',
    });
  }
}