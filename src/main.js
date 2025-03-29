import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { axiosImages } from "./js/pixabay-api";
import { displayImages } from "./js/render-functions";

const form = document.querySelector("form");
const loadingMessage = document.querySelector(".loader-first");
const loadingBottom = document.querySelector(".loader-bottom");
const btnLoadMore = document.querySelector(".btn-loadmore");
const gallery = document.querySelector(".gallery");

let currentPage = 1;
let previousSearch = "";
let userQuery = "";

form.addEventListener("submit", async (evt) => {
    evt.preventDefault();

    const input = evt.target.querySelector("input");
    const inputValue = input.value.trim();

    if (!inputValue) {
        iziToast.error({
            message: "Please fill in the field!",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
        return;
    }

    userQuery = inputValue;

    if (inputValue !== previousSearch) {
        currentPage = 1;
        previousSearch = inputValue;
        gallery.innerHTML = ""; 
    }

    loadingMessage.style.display = "block"; 
    btnLoadMore.style.display = "none";

    try {
        const { images, totalHits } = await axiosImages(userQuery, currentPage);

        if (!images.length) {
            iziToast.warning({
                message: "No images found. Try again!",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
            gallery.innerHTML = ""; 
            return;
        }

        displayImages(images, currentPage);

        if (currentPage * 15 >= totalHits) {
            btnLoadMore.style.display = "none";
            iziToast.error({
                message: "You've reached the end of search results.",
                position: "topRight",
                messageColor: "#FAFAFB",
                backgroundColor: "#EF4040"
            });
        } else {
            btnLoadMore.style.display = "block";
        }

        currentPage++;

    } catch (error) {
        iziToast.error({
            message: "Error fetching images",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        loadingMessage.style.display = "none"; 
    }

    form.reset();
});

btnLoadMore.addEventListener("click", async () => {
    btnLoadMore.style.display = "none";
    loadingBottom.style.display = "block"; 

    try {
        const { images, totalHits } = await axiosImages(userQuery, currentPage);

        if (images.length) {
            displayImages(images, currentPage);
            currentPage++;

            if (currentPage * 15 >= totalHits) {
                btnLoadMore.style.display = "none";
                iziToast.error({
                    message: "You've reached the end of search results.",
                    position: "topRight",
                    messageColor: "#FAFAFB",
                    backgroundColor: "#EF4040"
                });
            }

            scrollToNextImages();
        }
    } catch (error) {
        iziToast.error({
            message: "Error loading more images",
            position: "topRight",
            messageColor: "#FAFAFB",
            backgroundColor: "#EF4040"
        });
    } finally {
        loadingBottom.style.display = "none";
        btnLoadMore.style.display = "block";
    }
});

function scrollToNextImages() {
    const firstImageCard = document.querySelector(".img-card");
    if (firstImageCard) {
        const cardHeight = firstImageCard.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    }
}
