export interface ComicDetailFormat {
  about: {
    id: number,
    title: string,
    authorID: number,
    endFlag: boolean,
    image: string
  },
  author: {
    id: number,
    name: string
  },
  review: {
    id: number,
    comicID: number,
    userID: number,
    rate: number,
    comment: string
  },
  detail: any
}

export const initComicDetail: ComicDetailFormat = {
  about: {
    id: 0,
    title: "",
    authorID: 0,
    endFlag: false,
    image: ""
  },
  author: {
    id: 0,
    name: ""
  },
  review: {
    id: 0,
    comicID: 0,
    userID: 0,
    rate: 0,
    comment: ""
  },
  detail: []
}