import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  GetMap,
  CustomTable,
  NoData,
  Skeleton,
  TableSkeleton,
  BtnGroup,
  CustomPagination,
} from "../../ComponentsV2";
import useMapContext from "../../hooks/useMapContext";
import useErrorMessage from "../../hooks/useErrorMessage";
import useGetLivestockByStatus from "./hooks/useGetLivestockByStatus";
import toast from "react-hot-toast";

const btnData = [
  {
    label: "safe",
  },
  {
    label: "unsafe",
  },
];

const LiveLocation = () => {
  const [showLivestock, setShowLivestock] = useState("safe");
  const [pagination, setPagination] = useState(1);
  const [unsafePagination, setUnsafePagination] = useState(1);

  const { geofenceCoordinates } = useMapContext();
  const { isLoading, error, livestockData, dataLength } =
    useGetLivestockByStatus(showLivestock);

  const getFilteredLivestock = (data) => {
    const filteredData = data?.map((ele) => ({
      liveStockName: ele?.name,
      location: `lat : ${ele?.geolocation?.lat?.toString()?.slice(0, 6) || "0"},
    lng : ${ele?.geolocation?.lng?.toString()?.slice(0, 6) || "0"}`,
      collar: ele?.assignedDevice?.collarDevice?.deviceName || "N/A",
      pedometer: ele?.assignedDevice?.pedometerDevice?.deviceName || "N/A",
    }));
    return filteredData || [];
  };

  const isSafe = showLivestock === "safe";

  if (error) toast.error(error?.message || error);

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%", marginTop: 3 }}
      >
        {isLoading ? (
          <Skeleton
            height={"500px"}
            width={"100%"}
            sx={{
              background: "#eee",
            }}
          />
        ) : (
          <GetMap
            mapWidth="100%"
            mapHeight="500px"
            geofenceCoordinates={geofenceCoordinates}
            isLivestocks={true}
            livestockData={livestockData?.map((ele) => ({
              id: ele?._id,
              safeUnsafeStatus: ele?.liveStocklocationStatus,
              position: {
                lat: ele?.geolocation?.lat,
                lng: ele?.geolocation?.lng,
              },
            }))}
          />
        )}
      </Stack>
      <Stack direction={"row"} justifyContent={"center"} p={4}>
        <BtnGroup
          btnData={btnData}
          activeBtn={showLivestock}
          onChange={(ele) => setShowLivestock(ele)}
        />
      </Stack>

      <Stack direction="row" justifyContent="space-between" gap={5} pb={4}>
        {isLoading ? (
          <Box sx={{ width: "100%" }}>
            <TableSkeleton
              rowNumber={new Array(1).fill(0)}
              tableCell={new Array(3).fill("33.33%")}
              showOption={[]}
            />
          </Box>
        ) : (
          <Box sx={{ width: "100%" }}>
            <CustomTable
              headBackgroundColor={isSafe ? "#347D00" : "#FF0505"}
              tableHeadData={[
                `${isSafe ? "safe" : "unsafe"} Livestock`,
                "location",
                "Collar",
                "Pedometer",
              ]}
              tableRowData={getFilteredLivestock(livestockData)}
            />
            {!dataLength && !isLoading && <NoData />}
          </Box>
        )}

        {dataLength && !isLoading
          ? dataLength > 10 && (
              <Stack direction="row" justifyContent="center" p={2}>
                <CustomPagination
                  size="large"
                  page={isSafe ? pagination : unsafePagination}
                  count={Math.ceil(dataLength / 10)}
                  onPageChange={(pageNo) =>
                    isSafe ? setPagination(pageNo) : setUnsafePagination(pageNo)
                  }
                />
              </Stack>
            )
          : null}
      </Stack>
    </>
  );
};

export default LiveLocation;
