import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import Comics from '../api/comics';
import { makeStyles, Grid, Button } from "@material-ui/core";
import { initComicDetail } from "../type/ComicDetail";
import qs from 'query-string';

const useStyles = makeStyles(() => ({
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
  },
  subtitle: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    color: '#778899'
  }
}));

const CreateComicInfo: FC<any> = ((props)=>{
  const queryStr = props.location.search;
  const query = qs.parse(queryStr);
  const classes = useStyles();

  const [comic, setComic] = useState<any>(initComicDetail);
  const [isShowPage, setIsShowPage] = useState(false);
  const fetch = useCallback(async()=>{
    // queryにcomicIDがないとエラーにする
    const comicID: string = typeof query.comicID === "string"? query.comicID: '';
    setIsShowPage(comicID !== '');
    if(comicID) {
      const comics = new Comics();
      const comicDetail = await comics.getComicDetail(comicID);
      setComic(comicDetail.data.body);
      console.log(comic);
    }
  }, []);

  useEffect(()=>{
    fetch();
  }, [fetch]);

  return (
    <div>
      <Header/>
      {isShowPage &&
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12}>
            <p className={classes.subtitle}>漫画各話・既読登録</p>
          </Grid>
          <Grid item xs={12}>
            <Button size="large" variant="contained" color="primary">
              漫画既読登録
            </Button>
          </Grid>
        </Grid>
      }
      {!isShowPage &&
        <Grid container justify="center" className={classes.root}>
          <Grid item xs={12}>
            <p className={classes.subtitle}>comicIDがありません！</p>
          </Grid>
        </Grid>
      }
    </div>
  )
});

export default CreateComicInfo;