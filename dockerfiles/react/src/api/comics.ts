import axios from 'axios';

class Comics {
  host: string;
  constructor() {
    this.host = "http://localhost:3333";
  }
  async getComicList() {
    const url = this.host + '/get/comicList';
    return await axios.get(url);
  }
  async getComicDetail(id: string) {
    const url = this.host + '/get/comic/' + id;
    return await axios.get(url);
  }
}

export default Comics;