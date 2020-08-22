import React, { FC } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles } from "@material-ui/core";

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
  }
}));

const ComicReview: FC<Props> = ((props)=>{
  const classes = useStyles();
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
              {props.review.rate}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{minWidth: "50px"}}>
              コメント編集
            </TableCell>
            <TableCell>
              {props.review.comment}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
});

export default ComicReview;
