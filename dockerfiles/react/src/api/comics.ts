class Comics {
  host: string;
  axios: any;
  constructor() {
    this.host = "http://localhost:3333";
    this.axios = require('axios');
  }
  async getComicList() {
    const url = this.host + '/get/comicList';
    return await this.axios.get(url);
  }
}

export default Comics;