import { FC, useEffect, useCallback } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import { Grid } from "@material-ui/core";
import Comics from '../api/comics';

interface Props {

}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  }
}));

const Home: FC<Props> = (()=>{
  const classes = useStyles();
  const comics = new Comics();
  let comicList;
  const fetch = useCallback(async()=>{
    const getComicsList = await comics.getComicList();
    console.log(getComicsList);
  }, [comicList]);
  useEffect(()=>{
    fetch();
  }, [fetch]);
  return (
    <div>
      <Header />
      {/** 漫画検索 */}
      <Grid container justify="center" className={classes.root}>
        <Grid item xs={12}>
          漫画検索
        </Grid>
        <Grid item xs={8}>
          漫画検索
        </Grid>
        <Grid item xs={4}>
          検索
        </Grid>
      </Grid>
    </div>
  )
});

export default Home;