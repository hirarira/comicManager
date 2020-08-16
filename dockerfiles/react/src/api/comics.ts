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
    return await axios.post(url, params);
  }
}

export default Comics;