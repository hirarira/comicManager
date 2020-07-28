import { FC, useEffect, useCallback, useState } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Paper, Link } from "@material-ui/core";
import Comics from '../api/comics';

interface Props {

}

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
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
            漫画検索
          </Grid>
          <Grid item xs={12}>
            <FormControl>
              <InputLabel id="comic_title_label">漫画タイトル</InputLabel>
              <Select
                value={selectComic}
                onChange={handleComicChange}
                className={classes.formControl}
              >
                {comicList.map((x: any)=>{
                  return (
                    <MenuItem key={x.id} value={x.id}>{x.title}</MenuItem >
                  )
                })}
              </Select>
            </FormControl>
            <Link href={`/detail?comicID=${selectComic}`}>
              <Button variant="contained" color="primary" style={{ marginTop: "10px" }}>
                移動
              </Button>
            </Link>
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
});

export default Home;