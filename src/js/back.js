import axios from 'axios';

// export default class RequestImage {
//   #BASE_URL = 'https://pixabay.com/api/';
//   #API_KEY = '40892694-b915ef9d6feb731a5d3c7d944';
//   page = 1;
//   params = new URLSearchParams({
//     key: `${this.#API_KEY}`,
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//     per_page: 40,
//   });
    
 export default async function serviceImage(dataUser, page) {
      BASE_URL = 'https://pixabay.com/api/';
      API_KEY = '40892694-b915ef9d6feb731a5d3c7d944';
        try {
          //const respImage = await axios.get(`${this.#BASE_URL}?${this.params}&q=${dataUser}&page=${this.page}`);
            const respImage = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${dataUser}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
            return respImage;
        }
        catch (err) {
            console.log(err);
      }
  }
