import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import { RouteComponentProps } from 'react-router-dom'
import Comics from '../api/comics';
import { makeStyles, Grid, Button, TextField, Select, MenuItem, FormControl, Link, InputLabel } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import { initComicDetail } from "../type/ComicDetail";
import ComicAboutTable from "../components/ComicAboutTable";
import ComicDetailTable from "../components/ComicDetailTable";
import ComicReview from "../components/ComicReview";

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
  },
  subtitle: {
    marginTop: '1rem',
    fontSize: '1.5rem',
    color: '#778899'
  },
  formArea: {
    marginRight: '20px',
    width: '100px'
  }
}));

const ComicDetail: FC<DetailProps> = ((props)=>{
  const classes = useStyles();
  const comicID = props.match.params.comicID;
  const comics = new Comics();
  const [comic, setComic] = useState<any>(initComicDetail);
  const [createNewComicVol, setCreateNewComicVol] = useState(-1);
  const [selectUpdateComicVol, setSelectUpdateComicVol] = useState(1);
  // アラートを表示する（新規コミックVol追加）
  // 0: アラートなし
  // 1: 入力がおかしい（空白など）
  // 2: 登録済み
  // 3: 成功
  const [alertResult, setAlertResult] = useState(0);
  const updateComicDetail = useCallback(async()=>{
    const comicDetail = await comics.getComicDetail(comicID);
    setComic(comicDetail.data.body);
  }, []);

  useEffect(()=>{
    document.title = '漫画管理アプリ: 漫画概要';
    updateComicDetail();
  }, [fetch]);

  // 現在選択している新規巻数をUpdate
  const onChangeCreateNewComicVol = (event: any) => {
    setCreateNewComicVol(event.target.value);
  }

  // comicVolを追加する
  const createComicVol = async () => {
    if(createNewComicVol <= 0) {
      // アラート：入力異常
      setAlertResult(1);
    } else {
      const comicID = comic.about.id;
      try {
        const res = await comics.createComicVol(comicID, createNewComicVol);
        console.log(res);
        setAlertResult(3);
        updateComicDetail();
      } catch(e) {
        console.log(e.response.data);
        // アラート：すでに登録済み
        setAlertResult(2);
      }
    }
  }
  const getBookImage = () => {
    const baseImagePath = comic.about.image;
    if(baseImagePath) {
      const imagePath = baseImagePath.match(/static\/(.*)/)[1] || "";
      return `${comics.getHost()}/${imagePath}`;
    }
  }
  
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
          <img src={getBookImage()} width="300px" />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            <Link href={`/editComicAbout/${comicID}`}>
              概要編集
            </Link>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.subtitle}>各話詳細</p>
        </Grid>
        <Grid item xs={12}>
          <ComicDetailTable
            detail={comic.detail}
          />
        </Grid>
        <Grid item xs={12} className={classes.paperArea}>
          <TextField id="add-vol" label="追加する巻数" value={createNewComicVol} onChange={onChangeCreateNewComicVol} className={classes.formArea} />
          <Button size="large" variant="contained" color="primary" onClick={createComicVol}>
            新規巻数追加
          </Button>
          {/** アラート表示 */}
          { (alertResult === 1) &&
            <Alert severity="error">
              入力値は1以上の数値を入れてください
            </Alert>
          }
          { (alertResult === 2) &&
            <Alert severity="error">
              すでに登録済みです
            </Alert>
          }
          { (alertResult === 3) &&
            <Alert severity="success">
              登録完了です。追加した巻数: {createNewComicVol}
            </Alert>
          }
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel>編集する巻数</InputLabel>
            <Select
              id="updateComicVolID"
              value={selectUpdateComicVol}
              onChange={(e: any)=>{ setSelectUpdateComicVol(e.target.value) }}
              className={classes.formArea}
            >
              {
                comic.detail.map((detail: any, id: number)=>{
                  return (
                    <MenuItem key={id} value={detail.number}>{detail.number}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          <Link href={`/createComicInfo/${comicID}/${selectUpdateComicVol}/`}>
            <Button size="large" variant="contained" color="primary">
              漫画既読登録
            </Button>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <p className={classes.subtitle}>レビュー</p>
        </Grid>
        <Grid item xs={12}>
          <ComicReview
            review={comic.review}
          />
        </Grid>
      </Grid>
    </div>
  )
});

export default ComicDetail;