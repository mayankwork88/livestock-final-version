import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  GetMap,
  CustomTable,
  NoData,
  Skeleton,
  TableSkeleton,
} from "../../../../ComponentsV2";
import useGeofenceAndLivestock from "../hooks/useGeofenceAndLivestock";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const UserGeofenceAdmin = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    geofenceData,
    allLivestockMapData,
    safeLivestock,
    unsafeLivestock,
  } = useGeofenceAndLivestock(id);


  if (error) {
    toast.error(error?.message || "Server Error");
  }

  return (
    <>
      <Stack>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ width: "100%", marginTop: 3 }}
        >
          {isLoading ? (
            <Skeleton
              height={"500px"}
              width={"77.5vw"}
              sx={{
                background: "#eee",
              }}
            />
          ) : (
            "_id" in geofenceData && (
              <GetMap
                mapWidth="100%"
                mapHeight="500px"
                geofenceCoordinates={geofenceData}
                isLivestocks={true}
                livestockData={allLivestockMapData}
              />
            )
          )}
        </Stack>

        <Stack direction="row" justifyContent="space-between" gap={5}>
          {isLoading ? (
            <Box sx={{ margin: "20px 0", width: "100%" }}>
              <TableSkeleton
                rowNumber={new Array(1).fill(0)}
                tableCell={new Array(3).fill("33.33%")}
                showOption={[]}
              />
            </Box>
          ) : (
            "_id" in geofenceData && (
              <Box sx={{ margin: "20px 0", width: "100%" }}>
                <CustomTable
                  headBackgroundColor="#347D00"
                  tableHeadData={["Safe Livestock", "Collar", "Pedometer"]}
                  tableRowData={safeLivestock}
                />
              </Box>
            )
          )}

          {isLoading ? (
            <Box sx={{ margin: "20px 0", width: "100%" }}>
              <TableSkeleton
                rowNumber={new Array(1).fill(0)}
                tableCell={new Array(3).fill("33.33%")}
                showOption={[]}
              />
            </Box>
          ) : (
            "_id" in geofenceData && (
              <Box sx={{ margin: "20px 0", width: "100%" }}>
              <CustomTable
                headBackgroundColor="#FF0505"
                tableHeadData={["Unsafe Livestock", "Collar", "Pedometer"]}
                tableRowData={unsafeLivestock}
              />
            </Box>
            )
            
          )}
        </Stack>
        {!isLoading && !("_id" in geofenceData) && <NoData />}
      </Stack>
    </>
  );
};

export default UserGeofenceAdmin;
