import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-builder-493a4.firebaseio.com/'
});

export default instance;
