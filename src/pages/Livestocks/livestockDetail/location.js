import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import LocationLog from "./locationLog";
import {
  TableV2,
  BtnGroup,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
  TableSkeleton,
} from "../../../ComponentsV2";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { request } from "../../../apis/axios-utils";
import useDateFormat from "../../../hooks/useDateFormat";
import useUserId from "../../../hooks/useUserId";
import { locationTableHeadData, locationBtnData } from "../Data";
import useErrorMessage from "../../../hooks/useErrorMessage";
import toast from "react-hot-toast";



const getFormattedData = (data, formattedDate) => {
  return data?.map((ele) => ({
    title: [
      <Typography
        sx={{
          color: `${
            ele?.locationStatus?.toLowerCase() === "safe"
              ? "#06B95F"
              : "#FF0000"
          }`,
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {ele?.locationStatus}
      </Typography>,
    ],
    location: [
      <Typography
        sx={{
          color: `${
            ele?.locationStatus?.toLowerCase() === "safe"
              ? "#06B95F"
              : "#FF0000"
          }`,
          fontWeight: "bold",
          fontSize: "1.5rem",
        }}
      >
        {ele?.geolocation?.lat?.toString()?.slice(0, 6)},{" "}
        {ele?.geolocation?.lng?.toString()?.slice(0, 6)}
      </Typography>,
    ],
    address: ele?.address,
    updated: formattedDate(ele?.createdAt),
  }));
};

const getExportedData = (data, formattedDate) => {
  return data?.map((ele) => ({
    status: ele?.locationStatus,
    location: `lat : ${ele?.geolocation?.lat?.toString()?.slice(0, 6)},
    lng : ${ele?.geolocation?.lng?.toString()?.slice(0, 6)}`,
    address: ele?.address,
    updated: formattedDate(ele?.createdAt),
  }));
};
const Location = ({ data }) => {
  const {
    showLocationTab,
    setShowLocationTab,
    selectedDate,
    setSelectedDate,
    paginationPageNo,
    setPaginationPageNo,
    pageCount,
    setPageCount,
    pageLimit,
    setOpenBackdropLoader,
    openSnackbarAlert,
    openBackDropLoader,
  } = useLivestockContext();
  const { paginationDateFormat, formattedDate } = useDateFormat();
  const { getErrorMessage } = useErrorMessage();
  const [locationAlertsData, setLocationAlertsData] = useState([]);
  const [resentAlerts, setResentAlerts] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [geofenceData, setGeofenceData] = useState({
    farmLat: null,
    farmLng: null,
    circleLat: null,
    circleLng: null,
    radius: 0,
    polygon: [],
    geoFenceType: null,
    address: "",
  });
  const userId = useUserId();

  useEffect(() => {
    if (data?.id) {
      setOpenBackdropLoader(true);
      Promise.allSettled([
        request({ url: `/user/getUsersGeofence?userID=${userId}` }),
        request({
          url: `/liveStock/getliveStocklocationAlerts?liveStockID=${
            data?.id
          }&startDate=${paginationDateFormat(
            selectedDate[0]?.startDate
          )}&endDate=${paginationDateFormat(
            selectedDate[0]?.endDate
          )}&page=${paginationPageNo}&limit=${pageLimit}`,
        }),
        request({
          url: `/liveStock/getliveStocklocationAlerts?liveStockID=${
            data?.id
          }&startDate=${paginationDateFormat(
            new Date()
          )}&endDate=${paginationDateFormat(new Date())}&page=${1}&limit=${7}`,
        }),
      ])
        .then((res) => {
          const [res1, res2, res3] = res;
          let errorMessage = "";
          if (res1?.value?.status === 200) {
            const { data } = res1.value?.data;
            setGeofenceData({
              farmLat: data?.farmLat,
              farmLng: data?.farmLng,
              circleLat: data?.centerLat,
              circleLng: data?.centerLng,
              radius: data?.radius,
              polygon: data?.coordinates,
              geoFenceType: data?.geofenceType,
              address: data?.Address,
            });
          } else {
            setGeofenceData({
              farmLat: null,
              farmLng: null,
              circleLat: null,
              circleLng: null,
              radius: 0,
              polygon: [],
              geoFenceType: null,
              address: "",
            });
            errorMessage = res?.response?.data?.message;
          }
          if (res3?.value?.status === 200) {
            const { data } = res3.value?.data;
            const formattedData = data?.LocationAlert?.map((ele) => ({
              title: ele?.locationStatus,
              updated: formattedDate(ele?.createdAt),
            }));
            setResentAlerts(formattedData);
          } else {
            setResentAlerts([]);
            errorMessage = res?.response?.data?.message;
          }
          if (res2?.value?.status === 200) {
            const { data } = res2.value?.data;
            const formattedData = data?.LocationAlert;
            setLocationAlertsData(data?.LocationAlert);
            setPageCount(data?.PageCount);
            setDataLength(data?.dataLength);
          } else {
            const msg = getErrorMessage(res2);
            setLocationAlertsData([]);
            setPageCount(1);
            setDataLength(0);
            errorMessage = msg;
          }
          const firstLoad =
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate[0].startDate, "date") &&
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate[0].endDate, "date");
          if (!firstLoad && errorMessage) {
            toast.error(errorMessage);
          }
        })
        .catch((err) => {
          toast.error(err?.message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [data?.id, paginationPageNo, selectedDate]);

  useEffect(() => {
    setPaginationPageNo(1);
  }, [selectedDate]);

  const handleSnackBarAlert = () => {
    if (!dataLength) {
      toast.error("Nothing to Export");
    }
  };

  return (
    <Stack my={2} direction="column" alignItems="center" gap={2}>
      <BtnGroup
        btnData={locationBtnData}
        activeBtn={showLocationTab}
        onChange={(ele) => setShowLocationTab(ele)}
      />
      {showLocationTab === "location" ? (
        <Stack sx={{ width: "100%" }}>
          <LocationLog
            data={data}
            resentAlerts={resentAlerts}
            geofenceData={geofenceData}
          />
        </Stack>
      ) : (
        <Stack sx={{ width: "100%" }}>
          <Stack pb={2}>
            <TabPaneV2
              paneText={`showing ${
                dataLength < 10 ? dataLength : "10"
              } out of ${dataLength} Alerts`}
              datePicker={true}
              paneTextColor="#000"
              clearBtn={false}
              btnText={
                dataLength ? (
                  <ExportAsCSV
                    headers={locationTableHeadData}
                    data={getExportedData(locationAlertsData, formattedDate)}
                    fileName="alerts"
                  >
                    Export
                  </ExportAsCSV>
                ) : (
                  "Export"
                )
              }
              onBtnClick={handleSnackBarAlert}
              btnColor="#fff"
              btnBg="#B58B5D"
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Stack>
          {openBackDropLoader ? (
            <TableSkeleton
              rowNumber={new Array(10).fill(0)}
              tableCell={new Array(4).fill("20%")}
            />
          ) : locationAlertsData?.length ? (
            <TableV2
              paneText="activity log"
              paneTextColor="#B58B5D"
              isBtn={true}
              datePicker
              btnText="Export"
              btnColor="#fff"
              btnBg="#B58B5D"
              tableHeadData={locationTableHeadData}
              tableRowData={getFormattedData(locationAlertsData, formattedDate)}
            />
          ) : null}
          {locationAlertsData?.length ? (
            pageCount > 1 ? (
              <Stack direction="row" justifyContent="center" mt={5}>
                <CustomPagination
                  size="large"
                  count={pageCount}
                  page={paginationPageNo}
                  onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
                />
              </Stack>
            ) : null
          ) : (
            <NoData />
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default Location;
