import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import { RouteComponentProps } from 'react-router-dom'
import Comics from '../api/comics';
import { makeStyles, Grid, Paper, TableRow, TableCell, TableBody, Table, TableContainer } from "@material-ui/core";
import { ComicDetailFormat, initComicDetail } from "../type/ComicDetail";
import ComicAboutTable from "../components/ComicAboutTable";

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
  table: {
    margin: "20px",
    maxWidth: "640px"
  }
}));

const ComicDetail: FC<DetailProps> = ((props)=>{
  const classes = useStyles();
  const comicID = props.match.params.comicID;
  const [comic, setComic] = useState<any>(initComicDetail);
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
      </Grid>
    </div>
  )
});

export default ComicDetail;