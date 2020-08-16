import React, { FC, useCallback, useState, useEffect } from "react";
import Header from "../components/Header";
import Comics from '../api/comics';
import { makeStyles, Grid, Button, TableContainer, Table, TableBody, TableRow, TableCell, Paper, FormControl, Select, MenuItem, TextField } from "@material-ui/core";
import { initComicDetail } from "../type/ComicDetail";
import ComicAboutTable from "../components/ComicAboutTable";
import { format } from "date-fns";

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
    marginLeft: "auto",
    marginRight: "auto",
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
  const classes = useStyles();

  const [comic, setComic] = useState<any>(initComicDetail);
  const [comicDetail, setComicDetail] = useState<any>(null);
  const [isShowPage, setIsShowPage] = useState(false);
  const [buyFlag, setBuyFlag] = useState<string>("");
  const [buyDate, setBuyDate] = useState<Date>(new Date());
  const [readFlag, setReadFlag] = useState<string>("");
  const [readDate, setReadDate] = useState<Date>(new Date());
  
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
      const detail = comicDetail.data.body.detail.find((x: any)=>{
        return x.number == volID;
      });
      console.log(detail);
      if(detail) {
        setComicDetail(detail);
        setBuyFlag(detail.info.buyFlag);
        if(detail.info.buyDate) {
          setBuyDate(detail.info.buyDate);
        }
        setReadFlag(detail.info.readFlag);
        if (detail.info.readDate) {
          setReadDate(detail.info.readDate);
        }
      } else {
        setComicDetail(null);
      }
    }
  }, []);

  const submitRegistVol = async () => {
    console.log(buyFlag);
    console.log(buyDate);
    console.log(readFlag);
    console.log(readDate);
    console.log("----");
  }

  useEffect(()=>{
    fetch();
  }, [fetch]);

  return (
    <div>
      <Header/>
      {isShowPage && comicDetail &&
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
              <TableContainer component={Paper} className={classes.table}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>巻数</TableCell>
                      <TableCell>{comicDetail.number}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>購入フラグ</TableCell>
                      <TableCell>
                        <Select
                          value={buyFlag}
                          onChange={(x)=>{ setBuyFlag(String(x.target.value)) }}
                        >
                          <MenuItem value="true">True</MenuItem>
                          <MenuItem value="false">False</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>購入日</TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={format(buyDate, "yyyy-MM-dd")}
                          onChange={ (e)=>{ setBuyDate(new Date(e.target.value)) } }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>読破フラグ</TableCell>
                      <TableCell>
                        <Select
                          value={readFlag}
                          onChange={(x)=>{ setReadFlag(String(x.target.value)) }}
                        >
                          <MenuItem value="true">True</MenuItem>
                          <MenuItem value="false">False</MenuItem>
                        </Select>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>読破日</TableCell>
                      <TableCell>
                        <TextField
                          type="date"
                          value={format(readDate, "yyyy-MM-dd")}
                          onChange={ (e)=>{ setReadDate(new Date(e.target.value)) } }
                        />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>コメント</TableCell>
                      <TableCell>{comicDetail.info.comment}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Button size="large" variant="contained" color="primary" onClick={ submitRegistVol }>
              漫画既読登録
            </Button>
          </Grid>
        </Grid>
      }
      {!isShowPage || !comicDetail &&
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