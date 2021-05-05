import React, { FC } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles, TableHead } from "@material-ui/core";
import { format } from "date-fns";

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
    minWidth: "50px",
    paddingLeft: "5px",
    paddingRight: "5px"
  },
  comment: {
    minWidth: "200px",
  }
}));

const ComicDetailTable: FC<Props> = ((props)=>{
  const classes = useStyles();
  const showBuyDate = (info: any) => {
    if(info) {
      if(info.buyFlag) {
        return format(new Date(info.buyDate*1000), "yyyy-MM-dd");
      } else {
        return '未購入';
      }
    } else {
      return 'No Data';
    }
  }
  const showReadDate = (info: any) => {
    if(info) {
      if(info.readFlag) {
        return format(new Date(info.readDate*1000), "yyyy-MM-dd");
      } else {
        return '未購入';
      }
    } else {
      return 'No Data';
    }
  }
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.minRow}>巻数</TableCell>
            <TableCell className={classes.minRow}>購入日</TableCell>
            <TableCell className={classes.minRow}>読破日</TableCell>
            <TableCell className={classes.comment}>コメント</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            props.detail.map((detail, id)=>{
              return (
                <TableRow key={id}>
                  <TableCell>{detail.number}</TableCell>
                  <TableCell>{showBuyDate(detail.info)}</TableCell>
                  <TableCell>{showReadDate(detail.info)}</TableCell>
                  <TableCell>{detail.info? detail.info.comment: 'No Data'}</TableCell>
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