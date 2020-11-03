import { FC, useEffect, useCallback, useState } from "react";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Header from "../components/Header";
import { Grid, Select, MenuItem, Button, Paper, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from "@material-ui/core";
import Comics from '../api/comics';
import Authors from '../api/authors';
import AuthorListTable, { Author } from "../components/AuthorListTable";
import { Alert } from "@material-ui/lab";

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
  const [selectComicTitle, setSelectComicTitle] = useState('');
  const [selectComicAuthorID, setSelectComicAuthorID] = useState(0);
  const [selectComicImage, setSelectComicImage] = useState('');
  const [createResult, setCreateResult] = useState('');

  const comics = new Comics();
  const authors = new Authors();

  const fetch = useCallback(async()=>{
    const getAuthorList = await authors.getAuthorList();
    setAuthorList(getAuthorList.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ:漫画追加';
    fetch();
  }, [fetch]);

  const submitRegistComic = async () => {
    const params = {
      title: selectComicTitle,
      authorID: selectComicAuthorID,
      image: selectComicImage
    }
    try {
      const res: any = await comics.createComic(params);
      setCreateResult("ok");
    } catch(e) {
      setCreateResult("ng");
    }
  }

  return (
    <div>
      <Header />
      {/** 漫画検索 */}
      <Grid container justify="center" className={classes.root}>
        <Paper className={classes.paperArea}>
          <Grid item xs={12}>
            漫画新規登録
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper} className={classes.table}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>タイトル</TableCell>
                    <TableCell>
                      <TextField
                        value={selectComicTitle}
                        onChange={ (e)=>{ setSelectComicTitle(e.target.value) } }
                      />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>作者ID</TableCell>
                    <TableCell>
                      <Select
                        value={selectComicAuthorID}
                        onChange={(x)=>{ setSelectComicAuthorID(Number(x.target.value)) }}
                      >
                        {authorList.map((author: Author, id: number)=>{
                          return (
                            <MenuItem key={id} value={author.id}>{author.id}: {author.name}</MenuItem>
                          )
                        })}
                      </Select>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>書影</TableCell>
                    <TableCell>
                      <TextField
                        value={selectComicImage}
                        onChange={ (e)=>{ setSelectComicImage(e.target.value) } }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Button size="large" variant="contained" color="primary" onClick={ submitRegistComic }>
              漫画新規登録
            </Button>
          </Grid>
          <Grid item xs={12}>
            {createResult === 'ok' &&
              <Alert severity="success">
                登録完了です。
              </Alert>
            }
            {createResult === 'ng' &&
              <Alert severity="error">
                登録失敗です。
              </Alert>
            }
          </Grid>
        </Paper>
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
      </Grid>
    </div>
  )
});

export default CreateComic;