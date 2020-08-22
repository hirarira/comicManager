import React, { FC, useState, useEffect } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles, Slider, TextField } from "@material-ui/core";

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
  }
}));

const ComicReview: FC<Props> = ((props)=>{
  const [rate, setRate] = useState(props.review.rate);
  const [comment, setComment] = useState(props.review.comment);
  const classes = useStyles();
  useEffect(()=>{
    setRate(Number(props.review.rate));
    setComment(props.review.comment);
  }, [props]);
  return (
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
  )
});

export default ComicReview;
