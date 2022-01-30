import axios from 'axios';

const myKey = '14763371-8ad954d112ffa98330dee37e7';
const BASE_URL = 'https://pixabay.com/api/';
axios.defaults.baseURL = BASE_URL;

export const fetchImagesWithQuery = async (searchQuery, page) => {
  const response = await axios.get(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${myKey}&image_type=all&orientation=horizontal&per_page=12`
  );
  return response.data.hits;
};
