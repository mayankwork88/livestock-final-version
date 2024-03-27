import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

export default function CustomTable({
  headBackgroundColor,
  tableHeadData,
  tableRowData,
  bgColor,
}) {
  const TableCellHead = styled(TableCell)({
    background: headBackgroundColor,
    color: "#fff",
    fontSize: 15,
  });

  const TableCellBody = styled(TableCell)({ fontSize: 15 });

  const lastItemAlignment = (ind) =>
    tableHeadData?.length === ind + 1 ? "right" : null;
  const itemAlignment = (ind) =>
    tableHeadData?.length > 2 ? "center" : lastItemAlignment(ind);


    const getFilteredValue = (row) => {
      return row && Object.values(row)
      ?.filter(
        (el) => el !== null && !el?.toString()?.includes("_id_")
      )
    }

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 0,
        width: "100%",
      }}
    >
      <Table sx={{ width: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadData &&
              tableHeadData
                ?.map((col, ind) => (
                  <TableCellHead
                    key={col}
                    align={ind === 0
                      ? ""
                      : ind == tableHeadData?.length - 1
                      ? "right"
                      : "left"}
                    sx={{
                      // textAlign: `${itemAlignment(ind)}`,
                      textTransform: "capitalize",
                    }}
                  >
                    {col}
                  </TableCellHead>
                ))
                .filter((count) => count != 0)}
          </TableRow>
        </TableHead>
        <TableBody className={`${bgColor}`}>
          {tableRowData?.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                overflow: "hidden",
              }}
            >
              {getFilteredValue(row)?.map((ele, ind) => {
                  return (
                    <TableCellBody
                      component="th"
                      scope="row"
                      align={ind == getFilteredValue(row)?.length - 1
                        ? "right"
                        : "left"}
                    >
                      {!Array.isArray(ele) ? (
                        ele
                      ) : (
                        <Box>
                          {ele?.map((btn) => (
                            <IconButton aria-label="delete">{btn}</IconButton>
                          ))}
                        </Box>
                      )}
                    </TableCellBody>
                  )
                })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
