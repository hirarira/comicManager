import axios from 'axios';

class Comics {
  host: string;
  constructor() {
    this.host = "http://localhost:3334";
  }
  getHost() {
    return this.host;
  }
  async getComicList() {
    const url = this.host + '/get/comicList';
    return await axios.get(url);
  }
  async getComicDetail(id: string) {
    const url = this.host + '/get/comic/' + id;
    return await axios.get(url);
  }
  async createComicVol(comicID: string, number: number) {
    const url = `${this.host}/create/comicVol`;
    return await axios.post(url, {
      comicID: comicID,
      number: String(number)
    });
  }
  async createComicVolInfo(params: object) {
    const url = `${this.host}/create/comicVolInfo`;
    return await axios.post(url, params);
  }
  async updateComicVolInfo(params: object) {
    const url = `${this.host}/update/comicVolInfo`;
    return await axios.put(url, params);
  }
  async createComicReview(params: object) {
    const url = `${this.host}/create/comicReview`;
    return await axios.post(url, params);
  }
  async updateComicReview(params: object) {
    const url = `${this.host}/update/comicReview`;
    return await axios.put(url, params);
  }
  async createComic(params: object) {
    const url = `${this.host}/create/comic`;
    return await axios.post(url, params);
  }
}

export default Comics;