import React, { FC } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles } from "@material-ui/core";

interface Props {
  title: string,
  endFlag: boolean,
  author: string
}

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "20px",
    maxWidth: "640px"
  }
}));

const ComicAboutTable: FC<Props> = ((props)=>{
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{minWidth: "120px"}}>
              タイトル
            </TableCell>
            <TableCell>
              {props.title}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              完結済み
            </TableCell>
            <TableCell>
              {props.endFlag.toString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              作者
            </TableCell>
            <TableCell>
              {props.author}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
});

export default ComicAboutTable;