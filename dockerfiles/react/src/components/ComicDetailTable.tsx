import React, { FC } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles, TableHead } from "@material-ui/core";

interface Props {
  detail: [any],
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
  minRow: {
    minWidth: "50px"
  }
}));

const ComicDetailTable: FC<Props> = ((props)=>{
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.minRow}>巻数</TableCell>
            <TableCell className={classes.minRow}>購入日</TableCell>
            <TableCell className={classes.minRow}>読破日</TableCell>
            <TableCell>コメント</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.detail.map((detail, id)=>{
              return (
                <TableRow key={id}>
                  <TableCell>{detail.number}</TableCell>
                  <TableCell>{detail.info.buyDate}</TableCell>
                  <TableCell>{detail.info.readDate}</TableCell>
                  <TableCell>{detail.info.comment}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
});

export default ComicDetailTable;