import { FC, useEffect, useCallback, useState } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import { Grid, FormControl, InputLabel, Select, MenuItem, Button, Paper, Link } from "@material-ui/core";
import Comics from '../api/comics';
import Authors from '../api/authors';
import AuthorListTable from "../components/AuthorListTable";

interface Props {

}

const CreateComic: FC<Props> = (()=>{
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
  
  const classes = useStyles();
  const [authorList, setAuthorList] = useState([]);
  const [selectComic, setSelectComic] = useState('');

  const handleComicChange = (event: any) => {
    setSelectComic(event.target.value);
  };

  const fetch = useCallback(async()=>{
    const authors = new Authors();
    const getAuthorList = await authors.getAuthorList();
    console.log(getAuthorList.data.body);
    setAuthorList(getAuthorList.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ:漫画追加';
    fetch();
  }, [fetch]);

  return (
    <div>
      <Header />
      {/** 漫画検索 */}
      <Grid container justify="center" className={classes.root}>
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
            作者一覧
          </Grid>
          <Grid item xs={12}>
            <AuthorListTable
              authors={authorList}
            />
          </Grid>
        </Paper>
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
            漫画新規登録
          </Grid>
          <Grid item xs={12}>
            <Link href={`/detail/0`}>
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

export default CreateComic;