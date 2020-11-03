import axios from 'axios';

class Authors {
  host: string;
  constructor() {
    this.host = "http://localhost:3334";
  }
  async getAuthorList() {
    const url = `${this.host}/get/authors`;
    console.log(url);
    return await axios.get(url);
  }
  async createAuthor(name: string) {
    const url = `${this.host}/create/author`;
    return await axios.post(url, {
      name: name
    });
  }
  async deleteAuthor(id: number) {
    const url = `${this.host}/delete/author/${id}`;
    return await axios.delete(url);
  }
}

export default Authors;
