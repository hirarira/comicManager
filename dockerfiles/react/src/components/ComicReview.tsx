import React, { FC, useState, useEffect } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles, Slider, TextField, Button } from "@material-ui/core";
import Comics from "../api/comics";
import Alert from "@material-ui/lab/Alert";

interface Review {
  id: number,
  comicID: number,
  userID: number,
  rate: number,
  comment: string
}

interface Props {
  review: Review
}

const useStyles = makeStyles((theme) => ({
  table: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "20px",
    marginBottom: "20px",
    width: "90%",
    maxWidth: "640px"
  },
  textFiled: {
    width: "100%"
  },
  button: {
    marginTop: "10px",
    marginBottom: "10px",
  }
}));

const ComicReview: FC<Props> = ((props)=>{
  const comics = new Comics();
  console.log(props.review);
  const [rate, setRate] = useState(props.review.rate);
  const [comment, setComment] = useState(props.review.comment);
  const [resReviewResult, setResReviewResult] = useState("");
  const classes = useStyles();
  useEffect(()=>{
    setRate(Number(props.review.rate));
    setComment(props.review.comment);
  }, [props]);

  const updateReview = async () => {
    const params = {
      comicID: props.review.comicID,
      userID: props.review.userID,
      rate: rate,
      comment: comment
    }
    // 新規作成を試みる
    let res = await comics.createComicReview(params);
    if(res.data.status === 'ng') {
      res = await comics.updateComicReview(params);
    }
    if(res.data.status === 'ok') {
      setResReviewResult(res.data.status);
      props.review.rate = rate;
      props.review.comment = comment;
    } else {
      setResReviewResult(res.data.message);
    }
  }

  return (
    <div>
      <TableContainer component={Paper} className={classes.table}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell style={{minWidth: "50px"}}>
                評価
              </TableCell>
              <TableCell>
                {props.review.rate}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{minWidth: "50px"}}>
                コメント
              </TableCell>
              <TableCell>
                {props.review.comment}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{minWidth: "50px"}}>
                評価編集
              </TableCell>
              <TableCell>
                <Slider
                  value={rate}
                  onChange={(e, value)=>{ setRate(Number(value)) }}
                  aria-labelledby="discrete-slider-always"
                  valueLabelDisplay="on"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell style={{minWidth: "50px"}}>
                コメント編集
              </TableCell>
              <TableCell>
                <TextField
                  className={classes.textFiled}
                  value={comment}
                  multiline
                  rows={4}
                  onChange={ (e)=>{ setComment(e.target.value) } }
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Button size="large" variant="contained" color="primary" onClick={ updateReview } className={classes.button}>
          漫画既読登録
        </Button>
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={ () => { setResReviewResult("") } } className={classes.button}>
          status clear
        </Button>
      </div>
      <div>
        { resReviewResult === 'ok' &&
          <Alert severity="success">
            更新完了です。
          </Alert>
        }
        { resReviewResult && resReviewResult !== 'ok' &&
          <Alert severity="error">
            {resReviewResult}
          </Alert>
        }
      </div>
    </div>
  )
});

export default ComicReview;
