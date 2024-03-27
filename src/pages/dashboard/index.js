import { useState, useEffect } from "react";
import { Box, Typography, Stack, Paper } from "@mui/material";
import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  GetMap,
  DashboardCard,
  CustomModal,
  Skeleton,
} from "../../ComponentsV2";
import { AddCircleOutlineOutlinedIcon } from "../../icons";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import ModalContent from "./ModalContent";
import { DashboardNoData } from "../../assets";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { request } from "../../apis/axios-utils";
import { deviceData, adminDeviceData } from "./Data";
import useErrorMessage from "../../hooks/useErrorMessage";
import useLivestockContext from "../../hooks/useLivestockContext";
import useMapContext from "../../hooks/useMapContext";

const UserDashboard = () => {
  const theme = useTheme();
  const { getErrorMessage } = useErrorMessage();
  const { setLivestockTabControl, getAllLivestock, fetchOnce, setFetchOnce } =
    useLivestockContext();
  const { geofenceCoordinates, setSelectedFenceType } = useMapContext();
  const handleCompleteProfileModal =
    localStorage.getItem("showProfileCompleteModal") === "true";

  const setHandleCompleteProfileModal = () => {
    localStorage.removeItem("showProfileCompleteModal");
  };
  const navigate = useNavigate();

  const userName = JSON.parse(
    localStorage.getItem("userData")
  )?.userName?.split(" ")[0];

  const firstName = userName?.charAt(0)?.toUpperCase() + userName?.slice(1);
  const [getLivestockStatus, setGetLivestockStatus] = useState([]);
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalCollars: 0,
    totalLiveStock: 0,
    totalSafeLiveStock: 0,
    totalUnSafeLiveStock: 0,
    totalAlerts: 0,
    geolocationLat: 0,
    geolocationLng: 0,
    geolocationRadius: 0,
    totalDevices: "0/0",
  });

  useEffect(() => {
    setOpenBackdropLoader(true);
    request({
      url: "/user/getAllRecords",
    })
      .then((res) => {
        if (res?.status === 200) {
          const { data } = res?.data;

          const formattedData = {
            totalCollars: data?.totalDevice,
            totalLiveStock: data?.totalLiveStock,
            totalSafeLiveStock: data?.totalSafeLiveStock,
            totalUnSafeLiveStock: data?.totalUnSafeLiveStock,
            totalAlerts: data?.allAlertsCount,
            collarCount: data?.collarCount,
            pedometerCount: data?.pedometerCount,
            userCount: data?.userCount,
            totalDevices: `${data?.pedometerCount || 0}/${
              data?.collarCount || 0
            }`,
            geofence: {
              farmLat: data?.geofenceData?.farmLat,
              farmLng: data?.geofenceData?.farmLng,
              circleLat: data?.geofenceData?.centerLat,
              circleLng: data?.geofenceData?.centerLng,
              radius: data?.geofenceData?.radius,
              polygon: data?.geofenceData?.coordinates,
              geoFenceType: data?.geofenceData?.geofenceType,
              address: data?.geofenceData?.Address,
            },
          };

          const livestockFormattedData = data?.livestockLatLog?.map((ele) => ({
            id: ele?._id,
            safeUnsafeStatus: ele?.liveStocklocationStatus,
            position: {
              lat: ele?.geolocation?.lat,
              lng: ele?.geolocation?.lng,
            },
          }));

          setDashboardData(formattedData);
          setGetLivestockStatus(livestockFormattedData);
          if (
            data?.geofenceData?.radius ||
            data?.geofenceData?.coordinates.length > 2
          ) {
            localStorage.setItem("geofence", "done");
            localStorage.setItem("farmLocation", "true");
            if (data?.geofenceData?.geofenceType?.toLowerCase() === "polygon") {
              setSelectedFenceType("custom");
            } else {
              setSelectedFenceType("circular");
            }
          }
        } else {
          throw new Error(getErrorMessage(res));
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  }, []);

  const role = Number(
    JSON.parse(window?.localStorage?.getItem("userData"))?.role
  );
  const data = role == 1 ? adminDeviceData : deviceData;

  let timer;
  const handleDashboardCardClick = (ele) => {
    if (ele?.title?.toLowerCase() === "safe livestock") {
      setFetchOnce(true);
      getAllLivestock("safe");
      setLivestockTabControl(1);
      localStorage.setItem("currentTab", 1);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setFetchOnce(false);
      }, 1000);
    } else if (ele?.title?.toLowerCase() === "unsafe livestock") {
      setFetchOnce(true);
      getAllLivestock("unsafe");
      setLivestockTabControl(2);
      localStorage.setItem("currentTab", 2);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setFetchOnce(false);
      }, 1000);
    } else {
      setLivestockTabControl(0);
      localStorage.setItem("currentTab", 0);
    }
    navigate(ele?.link);
  };

  return (
    <>
      <AdminUIContainer BreadcrumbData={[]}>
        <CustomModal
          content={
            <ModalContent setHandleModal={setHandleCompleteProfileModal} />
          }
          openModal={handleCompleteProfileModal}
          customWidth="20%"
          handleClose={() => {}}
        />
        <Stack>
          <Stack
            style={{
              height: "160px",
              width: "100%",
              backgroundColor: "#B58B5D",
            }}
          >
            <Typography
              className="fs24px bold white_color p_t25px"
              sx={{ p: 5 }}
            >
              Welcome {firstName ? `${firstName},` : ""}
            </Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            flexGrow={1}
            p={5}
            gap={4}
            marginTop="-90px"
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              sx={{ width: { lg: "25%", md: "35%", sm: "40%" } }}
              gap={3}
            >
              {data?.map((ele) =>
                openBackdropLoader ? (
                  <Skeleton
                    width="100%"
                    height="100px"
                    sx={{
                      background: "#eee",
                      minHeight: "117.5px",
                    }}
                  />
                ) : (
                  <Box
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleDashboardCardClick(ele)}
                  >
                    <DashboardCard
                      key={ele.id}
                      title={ele.title}
                      total={dashboardData[ele.total]}
                      img={ele.img}
                    />
                  </Box>
                )
              )}
            </Stack>
            <Paper
              sx={{
                width: { lg: "75%", md: "65%", sm: "60%" },
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {!openBackdropLoader && !dashboardData?.geofence?.farmLat ? (
                <Box
                  width="100%"
                  height="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Box
                    component="img"
                    sx={{
                      width: 250,
                      height: 250,
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                    alt="livestock img"
                    src={DashboardNoData}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                    }}
                  >
                    <Stack
                      justifyContent="space-between"
                      alignItems="center"
                      sx={{
                        border: `2px solid ${theme.palette.primary.main}`,
                        cursor: "pointer",
                        width: 220,
                        height: 230,
                        p: 2,
                        borderRadius: theme.spacing(1),
                      }}
                      onClick={() => {
                        navigate("/devices");
                      }}
                    >
                      <AddCircleOutlineOutlinedIcon
                        sx={{
                          fontSize: 100,
                          color: theme.palette.primary.main,
                        }}
                      />
                      <TypographyPrimary
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: theme.spacing(4),
                        }}
                      >
                        Add Device
                      </TypographyPrimary>
                    </Stack>
                  </Box>
                </Box>
              ) : openBackdropLoader ? (
                <Skeleton
                  sx={{
                    width: { lg: "58vw", md: "59vw", sm: "54vw" },
                    height: { lg: "75vh", md: "75vh", sm: "55vh" },
                    background: "#eee",
                  }}
                />
              ) : (
                <GetMap
                  mapWidth="100%"
                  mapHeight="100%"
                  geofenceCoordinates={dashboardData?.geofence}
                  isLivestocks={true}
                  livestockData={getLivestockStatus}
                />
              )}
            </Paper>
          </Stack>
        </Stack>
      </AdminUIContainer>
    </>
  );
};

export default UserDashboard;
