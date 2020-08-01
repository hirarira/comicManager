import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import { RouteComponentProps } from 'react-router-dom'
import Comics from '../api/comics';
import { makeStyles, Grid } from "@material-ui/core";
import { ComicDetailFormat, initComicDetail } from "../type/ComicDetail";

type DetailProps = RouteComponentProps<{
  comicID: string
}>

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  paperArea: {
    margin: "20px",
    padding: "20px",
    width: "640px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 240
  }
}));

const ComicDetail: FC<DetailProps> = ((props)=>{
  const classes = useStyles();
  const comicID = props.match.params.comicID;
  const [comic, setComic] = useState({});
  const fetch = useCallback(async()=>{
    const comics = new Comics();
    const comicDetail = await comics.getComicDetail(comicID);
    setComic(comicDetail.data.body);
  }, []);

  useEffect(()=>{
    fetch();
  }, [fetch]);
  
  return (
    <div>
      <Header/>
      漫画詳細ページ
      {props.match.params.comicID}
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6}>
          書影
        </Grid>
      </Grid>
    </div>
  )
});

export default ComicDetail;