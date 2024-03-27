import { Box, Stack } from "@mui/material";
import {
  CustomPagination,
  CustomTable,
  NoData,
  TabPane,
  TableSkeleton,
} from "../../ComponentsV2";
import useLivestockContext from "../../hooks/useLivestockContext";
import { showLivestockTableHeadData } from "./Data";
import { useEffect } from "react";
import {
  getTabText,
  handleSearchQuery,
} from "../../Role/Admin/UserManagemnet/utils/utils";
import { livestockFilterOptions } from "../../Data/data";

const ShowLivestocks = ({ show }) => {
  const {
    allLivestocks,
    livestockDataLength,
    livestockPagination,
    setLivestockPagination,
    paginationSafe,
    setPaginationSafe,
    paginationUnsafe,
    setPaginationUnsafe,
    addNewLivestockLoading,
    getAllLivestock,
    openBackdropLoader,
    livestockSort,
    setLivestockSort,
    livestockSearch,
    setLivestockSearch,
    fetchOnce,
  } = useLivestockContext();

  const activePag = (status) => {
    const label = status?.toString()?.toLowerCase();
    if (label === "safe")
      return { get: paginationSafe, set: setPaginationSafe };
    else if (label === "unsafe")
      return { get: paginationUnsafe, set: setPaginationUnsafe };
    else return { get: livestockPagination, set: setLivestockPagination };
  };

  useEffect(() => {
    if (!fetchOnce) {
      getAllLivestock(show);
    }
  }, [
    addNewLivestockLoading,
    activePag(show).get,
    livestockSearch,
    livestockSort,
  ]);

  const livestockFiltering = () => {
    return allLivestocks?.map((el) => ({ ...el, status: null }));
  };

  const currentRole =
    Number(JSON.parse(window?.localStorage?.getItem("userData"))?.role) || 2;
  return (
    <Box my={4}>
      <Box sx={{ my: 4 }}>
        <TabPane
          text={getTabText("livestock", livestockDataLength)}
          minWidth="18rem"
          selectValue={currentRole === 1 && livestockSort}
          selectOptions={livestockFilterOptions}
          onSelectChange={(value) => setLivestockSort(value)}
          search={true}
          onSearch={(term) => handleSearchQuery(term, setLivestockSearch)}
        />
      </Box>
      {openBackdropLoader ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(7).fill("12%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={showLivestockTableHeadData}
          tableRowData={livestockFiltering()}
        />
      )}

      {!openBackdropLoader && livestockFiltering()?.length ? (
        livestockDataLength > 10 && (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={activePag(show).get}
              count={Math.ceil(livestockDataLength / 10)}
              onPageChange={(pageNo) => activePag(show).set(pageNo)}
            />
          </Stack>
        )
      ) : openBackdropLoader ? (
        <Stack sx={{ pt: 10 }}>
          {!openBackdropLoader && <NoData />}
        </Stack>
      ) : null}
    </Box>
  );
};

export default ShowLivestocks;
