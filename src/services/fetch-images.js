import axios from 'axios';

const myKey = '14763371-8ad954d112ffa98330dee37e7';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchImagesWithQuery = async (searchQuery, page) => {
  return await axios
    .get(
      `?q=${searchQuery}&page=${page}&key=${myKey}&image_type=all&orientation=horizontal&per_page=12`
    )
    .then(response => {
      if (response.status === 200) {
        return response.data.hits;
      }
      return Promise.reject(new Error(`Whoops`));
    });
};
