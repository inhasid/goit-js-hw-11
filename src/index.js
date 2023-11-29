import createMarkup from "./js/markup"
import axios from "axios";
import Notiflix from 'notiflix';


const refs = {
    searchForm: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more"),
};

const { searchForm, gallery, loadMoreBtn } = refs;

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "40892694-b915ef9d6feb731a5d3c7d944";

loadMoreBtn.classList.add('is-hidden');

let page = 1;
let dataUserRes = '';

searchForm.addEventListener('submit', handleSubmitImages);
loadMoreBtn.addEventListener('click', handleClickLoadMore);

function handleClickLoadMore() {
    loadMoreBtn.classList.add('is-hidden');
    serviceImage();
}

async function handleSubmitImages(event) {
    event.preventDefault();
    
    const userData = event.target[0].value;
    console.log(userData);
    dataUserRes = userData.trim();

   // userData = '';
    if (!dataUserRes) {
        Notiflix.Notify.failure('Please enter your request');
        return;
    }

    page = 1;
    gallery.innerHTML = '';
    await serviceImage();
}


async function serviceImage() {

    const params = new URLSearchParams({
                key: `${API_KEY}`,
                q: `${dataUserRes}`,
             //   image_type: 'photo',
             //  orientation: 'horizontal',
             //   safesearch: 'true',
    });
    
    try {
        const respImage = await axios.get(
            `${BASE_URL}?key=${API_KEY}&q=${dataUserRes}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`
        );
        const { totalHits, hits } = respImage.data;
        
        if (hits.length === 0) {
            loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.warning(
                'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
        }
            
        gallery.insertAdjacentHTML("beforeend", createMarkup(hits));

        if (page * 40 <= totalHits) {
            loadMoreBtn.classList.remove('is-hidden');

        } else {
            loadMoreBtn.classList.add('is-hidden');
            Notiflix.Notify.info(`Hooray! We found ${totalHits} images.`);
        }
        page += 1;
    }
    catch (err) {
        console.log(err);
        Notiflix.Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
    }
    finally {
        searchForm.reset();
    }
}
