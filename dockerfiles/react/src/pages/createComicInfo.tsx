import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import Comics from '../api/comics';
import { makeStyles, Grid, Button } from "@material-ui/core";
import { initComicDetail } from "../type/ComicDetail";
import ComicAboutTable from "../components/ComicAboutTable";

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

/**
 * コミック各話の話数登録を行う
 * 読んだ話数の既読登録・コメント入力など
 */
const CreateComicInfo: FC<any> = ((props)=>{
  /* クエリから値を取得する場合
  const queryStr = props.location.search;
  const query = qs.parse(queryStr);
  */
  const params = props.match.params;
  console.log(params);
  const classes = useStyles();

  const [comic, setComic] = useState<any>(initComicDetail);
  const [isShowPage, setIsShowPage] = useState(false);
  const fetch = useCallback(async()=>{
    // queryにcomicIDがないとエラーにする
    // const comicID: string = typeof query.comicID === "string"? query.comicID: '';
    const comicID = params.comicID;
    const volID = params.volID;
    setIsShowPage(comicID && volID);
    if(comicID) {
      const comics = new Comics();
      const comicDetail = await comics.getComicDetail(comicID);
      setComic(comicDetail.data.body);
      console.log(comicDetail);
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
          <Grid item xs={12}>
            <p className={classes.subtitle}>漫画既読・コメント登録</p>
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