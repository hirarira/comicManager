import { Grid, makeStyles } from "@material-ui/core";
import React, { useCallback, useState, useEffect } from "react";
import { RouteComponentProps } from 'react-router-dom';
import Comics from "../api/comics";
import ComicAboutTable from "../components/ComicAboutTable";
import Header from "../components/Header";
import { initComicDetail } from "../type/ComicDetail";

type DetailProps = RouteComponentProps<{
  comicID: string
}>

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  }
}));

const ComicAboutEdit: React.FC<DetailProps> = ((props)=>{
  const classes = useStyles();
  const comicID = props.match.params.comicID;
  const comics = new Comics();
  const [comic, setComic] = useState<any>(initComicDetail);

  const updateComicDetail = useCallback(async()=>{
    const comicDetail = await comics.getComicDetail(comicID);
    setComic(comicDetail.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ: 漫画概要編集';
    updateComicDetail();
  }, [fetch]);

  return (
    <div>
      <Header/>
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={6}>
          <ComicAboutTable
            title={comic.about.title}
            endFlag={comic.about.endFlag}
            author={comic.author.name}
          />
        </Grid>
        <Grid item xs={6}>
          書影
        </Grid>
        <Grid item xs={12}>
          <form action={`${comics.getHost()}/update/comic`} method="post">
            <input name="_method" type="hidden" value="put" />
            <input type="text" name="id" value={comicID} /><br/>
            <input type="file" name="bookImage" accept="image/jpeg, image/png" /><br/>
            <input type="submit" value="送信"/><br/>
          </form>
        </Grid>
      </Grid>
    </div>
  )
});

export default ComicAboutEdit;
