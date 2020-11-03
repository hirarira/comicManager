import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { FC, useEffect, useCallback, useState } from "react";
import Authors from "../api/authors";
import AuthorListTable from "../components/AuthorListTable";
import Header from "../components/Header";

const AuthorManager: FC = (()=>{
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
    },
    table: {
      marginLeft: "auto",
      marginRight: "auto",
      margin: "20px",
      maxWidth: "640px"
    },
  }));
  const classes = useStyles();
  const [authorList, setAuthorList] = useState([]);

  const authors = new Authors();

  const fetch = useCallback(async()=>{
    const getAuthorList = await authors.getAuthorList();
    setAuthorList(getAuthorList.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ: 作者管理';
    fetch();
  }, [fetch]);
  
  return (
    <div>
      <Header />
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
              作者作成
          </Grid>
        </Paper>
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
              作者削除
          </Grid>
        </Paper>
      </Grid>
    </div>
  )
});

export default AuthorManager;
