import React, { FC } from "react";
import { Paper, TableRow, TableCell, TableBody, Table, TableContainer, makeStyles, TableHead } from "@material-ui/core";

export interface Author {
  id: number,
  name: string
}

interface Props {
  authors: Array<Author>;
}

const useStyles = makeStyles((theme) => ({
  table: {
    margin: "20px",
    maxWidth: "640px"
  }
}));

const AuthorListTable: FC<Props> = ((props)=>{
  const classes = useStyles();
  return (
    <TableContainer component={Paper} className={classes.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
            Author ID
            </TableCell>
            <TableCell>
            作者名
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.authors.map((author, id)=>{
            return (
              <TableRow key={id}>
                <TableCell style={{minWidth: "50px"}}>
                  {author.id}
                </TableCell>
                <TableCell>
                  {author.name}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
});

export default AuthorListTable;