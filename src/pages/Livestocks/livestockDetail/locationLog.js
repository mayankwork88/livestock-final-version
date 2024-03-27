import React from "react";
import { Stack, Box, Paper } from "@mui/material";
import {
  GetMap,
  LocationStatusCard,
  TableV2,
  NoData,
  TabPaneV2,
  Skeleton,
  TableSkeleton,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";

const tableColors = ["#06B95F", "#FC5555"];

const tableHeadData = [];
const LocationLog = ({ data, resentAlerts, geofenceData }) => {
  const { setShowLocationTab, openBackdropLoader } = useLivestockContext();
  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xl: "row", lg: "row", sm: "column-reverse" },
        width: "100%",
      }}
      gap={4}
    >
      <Stack sx={{ width: { xl: "30%", lg: "30%", sm: "100%" } }} gap={3}>
        {openBackdropLoader ? (
          <Paper>
            <Skeleton
              width={"19vw"}
              height={"10vh"}
              sx={{ background: "#fff" }}
            />
          </Paper>
        ) : (
          <LocationStatusCard data={data} />
        )}
        {openBackdropLoader ? (
          <TableSkeleton
            rowNumber={new Array(7).fill(0)}
            tableCell={new Array(2).fill("12%")}
          />
        ) : (
          <Box className="border-10" sx={{ overflow: "hidden" }}>
            {resentAlerts?.length ? (
              <>
                <Stack>
                  <TabPaneV2
                    paneText="Location Status Log"
                    paneTextColor="#000"
                    btnText="See all"
                    btnColor="#fff"
                    btnBg="#B58B5D"
                    datePicker={false}
                    onBtnClick={() => setShowLocationTab("analytics")}
                  />
                </Stack>
                <TableV2
                  paneText="location status log"
                  paneTextColor="#B58B5D"
                  btnText="See All"
                  isBtn={true}
                  btnColor="#fff"
                  btnBg="#B58B5D"
                  tableHeadData={tableHeadData}
                  tableRowData={resentAlerts}
                  tableColors={tableColors}
                  onBtnClick={() => setShowLocationTab("analytics")}
                />
              </>
            ) : (
              <NoData />
            )}
          </Box>
        )}
      </Stack>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        {openBackdropLoader ? (
          <Paper>
            <Skeleton
              width={"58vw"}
              height={"554px"}
              sx={{ background: "#fff" }}
            />
          </Paper>
        ) : (
          <GetMap
            mapWidth="100%"
            mapHeight="545px"
            geofenceCoordinates={geofenceData}
            isLivestocks={true}
            livestockData={[
              {
                id: Date.now(),
                safeUnsafeStatus: data?.liveStocklocationStatus,
                position: {
                  lat: data?.geolocation?.lat,
                  lng: data?.geolocation?.lng,
                },
              },
            ]}
          />
        )}
      </Stack>
    </Stack>
  );
};

export default LocationLog;
