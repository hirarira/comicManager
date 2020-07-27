import axios from 'axios';

class Comics {
  host: string;
  axios: any;
  constructor() {
    this.host = "http://localhost:3333";
  }
  async getComicList() {
    const url = this.host + '/get/comicList';
    return await axios.get(url);
  }
}

export default Comics;