import { FC } from "react";
import Header from "../components/Header";
import React from "react";
import { RouteComponentProps } from 'react-router-dom'

type DetailProps = RouteComponentProps<{
  comicID: string
}>

const ComicDetail: FC<DetailProps> = ((props)=>{
  return (
    <div>
      <Header/>
      漫画詳細ページ
      {props.match.params.comicID}
    </div>
  )
});

export default ComicDetail;