import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1976D2",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: { xs: "8px", sm: "14px" },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(email: string, phone_number: string, text: string, created_date: string) {
  return { email, phone_number, text, created_date };
}

const CustomizedTables: React.FC<{
  data: Array<{ email: string; phone_number: string; text: string; created_date: string }>;
}> = ({ data }) => {
  var rows: Array<{ email: string; phone_number: string; text: string; created_date: string }> =
    [];
  data.forEach((item) => {
    rows.push(createData(item.email, item.phone_number, item.text, item.created_date));
  });

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: "100%" }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">تلفن</StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              ایمیل
            </StyledTableCell>
            <StyledTableCell
              align="right"
              sx={{ display: { xs: "none", sm: "table-cell" } }}
            >
              متن پیام
            </StyledTableCell>
            <StyledTableCell align="right">زمان</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.phone_number}>
              <StyledTableCell component="th" scope="row" align="right">
                {row.phone_number}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {row.email}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                sx={{ display: { xs: "none", sm: "table-cell" } }}
              >
                {row.text}
              </StyledTableCell>
              <StyledTableCell align="right">
                {new Date(row.created_date).toLocaleString("fa-IR")}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
