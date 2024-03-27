import {
  TableBody,
  TableCell,
  TableRow,
  Stack,
  Table,
  Paper,
  TableContainer,
} from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

const TableSkeleton = ({ rowNumber, tableCell, actions }) => {
  return (
    <Stack width={"100%"}>
      <TableContainer
        component={Paper}
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 0,
          width: "100%",
        }}
      >
        <Table>
          <TableBody className="tablerow">
            {rowNumber?.length > 0 &&
              rowNumber.map((row, index) => (
                <TableRow
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    overflow: "hidden",
                  }}
                  key={index}
                >
                  {tableCell?.length > 0 &&
                    tableCell.map((a, b) => (
                      <TableCell
                        component="th"
                        scope="row"
                        sx={{ textAlign: "center", width: a }}
                      >
                        {actions?.length && b === tableCell.length - 1 ? (
                          <Stack
                            direction={"row"}
                            justifyContent={"center"}
                            gap={"10px"}
                            flexGrow={0}
                          >
                            {actions?.map((ele) => (
                              <Skeleton
                                variant="circular"
                                sx={{
                                  fontSize: "1rem",
                                  width: "30px",
                                  height: "30px",
                                }}
                              />
                            ))}
                          </Stack>
                        ) : (
                          <Stack direction={"row"} justifyContent={"center"}>
                            <Skeleton
                              variant="text"
                              sx={{
                                fontSize: "1rem",
                                width: "30%",
                                height: "30px",
                              }}
                            />
                          </Stack>
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};
export default TableSkeleton;
