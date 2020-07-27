import { FC, useEffect, useCallback, useState } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import Comics from '../api/comics';

interface Props {

}

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  }
}));

const Home: FC<Props> = (()=>{
  const classes = useStyles();
  const [comicList, setComicList] = useState([]);
  const [selectComic, setSelectComic] = useState('');

  const handleComicChange = (event: any) => {
    setSelectComic(event.target.value);
  };

  const fetch = useCallback(async()=>{
    const comics = new Comics();
    const getComicsList = await comics.getComicList();
    setComicList(getComicsList.data.body);
  }, []);

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
          <FormControl className={classes.formControl}>
            <InputLabel id="comic_title_label">漫画タイトル</InputLabel>
            <Select
              value={selectComic}
              onChange={handleComicChange}
            >
              {comicList.map((x: any)=>{
                return (
                  <MenuItem key={x.id} value={x.id}>{x.title}</MenuItem >
                )
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4}>
          検索
        </Grid>
      </Grid>
    </div>
  )
});

export default Home;