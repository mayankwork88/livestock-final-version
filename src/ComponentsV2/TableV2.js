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

export default function TableV2({
  tableHeadData,
  tableRowData,
  tableColors,
  logs,
}) {
  const getColor = (ele, row) => {
    let color;
    if (logs?.length) {
      let res = logs?.find(
        (element) => row?.name?.toLowerCase() === element?.name?.toLowerCase()
      );
      color =
        typeof ele === "number" && res?.color === "err-color" ? "#FC5555" : "";
    } else {
      color =
        tableColors === undefined
          ? null
          : ele?.toLowerCase()?.includes("pm") ||
            ele?.toLowerCase()?.includes("am")
          ? null
          : row?.title?.toLowerCase() === "safe"
          ? tableColors[0]
          : tableColors[1];
    }
    return color;
  };

  const getFilteredValue = (row) => {
    return row && Object.values(row)?.filter((el) => el !== null);
  };

  return (
    <TableContainer component={Paper} sx={{ border: "1px solid #dddddd" }}>
      <Table size="large" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {tableHeadData &&
              tableHeadData
                ?.map((col, ind) => {
                  return (
                    <TableCell
                      key={col}
                      align={
                        ind === 0
                          ? ""
                          : ind == tableHeadData?.length - 1
                          ? "right"
                          : "left"
                      }
                      sx={{
                        fontWeight: "bold",
                        textTransform: "capitalize",
                        color: "#B0B0B0",
                        fontSize: "1.3rem",
                      }}
                    >
                      {col}
                    </TableCell>
                  );
                })
                .filter((count) => count != 0)}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRowData?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              {getFilteredValue(row)?.map((ele, ind) => {
                return (
                  <TableCell
                    component={ind === 0 ? "th" : ""}
                    scope={ind === 0 ? "row" : ""}
                    align={
                      ind == getFilteredValue(row)?.length - 1
                        ? "right"
                        : "left"
                    }
                    sx={{
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      color: getColor(ele, row),
                      fontSize: "1.5rem",
                      textTransform: "capitalize",
                    }}
                  >
                    {!Array.isArray(ele) ? (
                      ele
                    ) : (
                      <Box>{ele?.map((btn) => btn)}</Box>
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
