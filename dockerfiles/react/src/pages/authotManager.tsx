import { Button, Grid, makeStyles, MenuItem, Paper, Select, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React, { FC, useEffect, useCallback, useState } from "react";
import Authors from "../api/authors";
import AuthorListTable, { Author } from "../components/AuthorListTable";
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
  const [createAuthorName, setCreateAuthorName] = useState("");
  const [deleteAuthorID, setDeleteAuthorID] = useState(0);
  const [httpResStatus, setHttpResStates] = useState({
    status: '',
    message: ''
  });

  const authors = new Authors();

  const fetch = useCallback(async()=>{
    const getAuthorList = await authors.getAuthorList();
    setAuthorList(getAuthorList.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ: 作者管理';
    fetch();
  }, [fetch]);

  const submitCreateAuthor = async () =>{
    try {
      const res = await authors.createAuthor(createAuthorName);
      setHttpResStates({
        status: 'ok',
        message: '正常に作者が追加されました'
      });
    } catch (e) {
      setHttpResStates({
        status: 'ng',
        message: '作者が追加されませんでした'
      });
    }
    fetch();
  }
  
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
          <Grid item xs={12}>
            <TextField
              value={createAuthorName}
              onChange={ (e)=>{ setCreateAuthorName(e.target.value) } }
            />
          </Grid>
          <Grid item xs={12}>
            <Button size="large" variant="contained" color="primary" onClick={ submitCreateAuthor }>
              作者新規登録
            </Button>
          </Grid>
        </Paper>
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
              作者削除
          </Grid>
          <Grid item xs={12}>
            <Select
              value={deleteAuthorID}
              onChange={(x)=>{ setDeleteAuthorID(Number(x.target.value)) }}
            >
              {authorList.map((author: Author, id: number)=>{
                return (
                  <MenuItem key={id} value={author.id}>{author.id}: {author.name}</MenuItem>
                )
              })}
            </Select>
          </Grid>
        </Paper>
        <Paper className={classes.paperArea}>
          {httpResStatus.status === 'ok' &&
            <Alert severity="success">
              {httpResStatus.message}
            </Alert>
          }
          {httpResStatus.status === 'ng' &&
            <Alert severity="error">
              {httpResStatus.message}
            </Alert>
          }
        </Paper>
      </Grid>
    </div>
  )
});

export default AuthorManager;
