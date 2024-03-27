import {
  CustomPagination,
  CustomTable,
  NoData,
  TabPane,
  TableSkeleton,
} from "../../ComponentsV2";
import { Box, Stack } from "@mui/material";
import useCollarContext from "../../hooks/useCollarContext";
import { showCollarTableHeadData } from "./Data";
import { useEffect } from "react";
import { getTabText } from "../../Role/Admin/UserManagemnet/utils/utils";
import { handleSearchQuery } from "../../Role/Admin/UserManagemnet/utils/utils";
import { filterOptions } from "../../Data/data";

const ShowCollars = ({ show }) => {
  const {
    collars,
    deviceDataLength,
    pedometerPagination,
    openBackdropLoader,
    isLoading,
    activeDevice,
    setPedometerPagination,
    getAllDevices,
    pedometerPaginationPageAssigned,
    setPedometerPaginationPageAssigned,
    pedometerPaginationPageNotAssigned,
    setPedometerPaginationPageNotAssigned,
    deviceSearch,
    setDeviceSearch,
    deviceSort,
    setDeviceSort,
  } = useCollarContext();

  const activePag = (status) => {
    const label = status?.toString()?.toLowerCase();
    if (label === "all")
      return { get: pedometerPagination, set: setPedometerPagination };
    else if (label === "true")
      return {
        get: pedometerPaginationPageAssigned,
        set: setPedometerPaginationPageAssigned,
      };
    else if (label === "false")
      return {
        get: pedometerPaginationPageNotAssigned,
        set: setPedometerPaginationPageNotAssigned,
      };
  };

  useEffect(() => {
    getAllDevices(show);
  }, [isLoading, activeDevice, activePag(show).get, deviceSearch, deviceSort]);

  const collarFiltering = () => {
    return collars?.map((el) => ({ ...el, status: null }));
  };

  const currentRole =
  Number(JSON.parse(window?.localStorage?.getItem("userData"))?.role) || 2;

  return (
    <Box my={4} width="100%">
      <Box sx={{ my: 4 }}>
        <TabPane
          text={getTabText(`${deviceDataLength>1?"pedometers":"pedometer"}`, deviceDataLength)}
          minWidth="18rem"
          selectValue={deviceSort}
          selectOptions={filterOptions?.filter((ele) =>
            ele?.role?.includes(currentRole)
          )}
          onSelectChange={(value) => setDeviceSort(value)}
          search={true}
          onSearch={(term) => handleSearchQuery(term, setDeviceSearch)}
        />
      </Box>
      {openBackdropLoader ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(5).fill("15%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={showCollarTableHeadData}
          tableRowData={collarFiltering()}
        />
      )}

      {collarFiltering()?.length ? (
        deviceDataLength > 10 && (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={activePag(show)?.get}
              count={Math.ceil(deviceDataLength / 10)}
              onPageChange={(pageNo) => activePag(show)?.set(pageNo)}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default ShowCollars;
