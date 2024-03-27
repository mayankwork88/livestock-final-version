import { useEffect, useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import {
  AlertCard,
  TableV2,
  TabPaneV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
  TableSkeleton,
  Skeleton,
} from "../../../ComponentsV2";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useLivestockContext from "../../../hooks/useLivestockContext";
import useDateFormat from "../../../hooks/useDateFormat";
import { request } from "../../../apis/axios-utils";
import { livestockDetailAlertTableHeadData } from "../Data";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { useLivestockHealthContext } from "../../../context/LivestockHealthContext";
import { useParams } from "react-router-dom";
import { alertsThresholdData } from "./alertThresholdData";
import toast from "react-hot-toast";

const Alerts = ({ data }) => {
  const {
    selectedDate,
    setSelectedDate,
    paginationPageNo,
    setPaginationPageNo,
    pageCount,
    setPageCount,
    pageLimit,
    handleAlertDelete,
    livestockAlertClear,
    openSnackbarAlert,
    setOpenBackdropLoader,
    openBackdropLoader,
    alertsDataLength,
    setAlertsDataLength,
  } = useLivestockContext();
  const { getHealthCardData, healthCardData, healthDataLoading } =
    useLivestockHealthContext();
  const { paginationDateFormat, formattedDate } = useDateFormat();
  const [alertsThresholds, setAlertsThresholds] = useState([]);
  const [singleLivestockAlerts, setSingleLivestockAlerts] = useState([]);
  const { getErrorMessage } = useErrorMessage();
  const { id } = useParams();
  const { threshold } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
    // const interval = setInterval(() => {
    //   getHealthCardData(id);
    //   getChartData(id);
    //   getLogs(id);
    // }, 60000);
    // return () => clearInterval(interval);
  }, [id]);

  useEffect(() => {
    getThresholdFormattedData(threshold);
  }, [threshold]);

  useEffect(() => {
    setOpenBackdropLoader(true);
    if (data?.id) {
      request({
        url: `/liveStock/getSingleLiveStockAllAlerts?liveStockID=${
          data?.id
        }&startDate=${paginationDateFormat(
          selectedDate[0]?.startDate
        )}&endDate=${paginationDateFormat(
          selectedDate[0]?.endDate
        )}&page=${paginationPageNo}&limit=${pageLimit}`,
      })
        .then((res) => {
          if (
            res.status === 200 &&
            res?.data?.data?.LiveStockAlertData?.length
          ) {
            const { data } = res.data;
            const formattedData = data?.LiveStockAlertData?.map((ele) => ({
              id: ele?._id,
              alertName: ele?.message,
              thresholdValue: ele?.thresholdValue,
              alarmValue: ele?.alertValue,
              time: formattedDate(ele?.createdAt, "time"),
              date: formattedDate(ele?.createdAt, "date"),
            }));
            setSingleLivestockAlerts(formattedData);
            setPageCount(data?.totalPage);
            setAlertsDataLength(data?.dataLength);
          } else {
            const msg = res?.data?.data?.LiveStockAlertData?.length
              ? getErrorMessage(res)
              : "No data found";
            setSingleLivestockAlerts([]);
            setPageCount(1);
            setAlertsDataLength(0);
            throw new Error(msg);
          }
        })
        .catch((err) => {
          const firstLoad =
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate[0].startDate, "date") &&
            paginationDateFormat(new Date(), "date") ===
              paginationDateFormat(selectedDate[0].endDate, "date");
          if (!firstLoad) toast.error(err.message);
        })
        .finally(() => setOpenBackdropLoader(false));
    }
  }, [data?.id, paginationPageNo, selectedDate, livestockAlertClear]);

  useEffect(() => {
    setPaginationPageNo(1);
  }, [selectedDate]);

  const handleThresholdEdit = (id) => {
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          isEdit: !ele?.isEdit,
        };
      } else return ele;
    });

    setAlertsThresholds(updatedData);
  };

  const handleThresholdChange = (event, id) => {
    const { name, value } = event?.target;
    const updatedData = alertsThresholds?.map((ele) => {
      if (ele.id === id) {
        return {
          ...ele,
          value: {
            ...ele.value,
            [name]: value,
          },
        };
      } else return ele;
    });
    setAlertsThresholds(updatedData);
  };

  const handleThresholdAlertSubmit = async (id) => {
    const body = {};

    alertsThresholds?.forEach((el) => {
      body[el.label] = el.value;
    });
    setOpenBackdropLoader(true);
    try {
      if (data?.id) {
        const res = await request({
          url: `/liveStock/updateLiveStockThreshold?liveStockId=${data?.id}`,
          method: "PATCH",
          data: body,
        });
        if (res?.status === 200) {
          handleThresholdEdit(id);
          toast.success("Threshold successfully updated");
        } else {
          throw new Error(getErrorMessage(res));
        }
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setOpenBackdropLoader(false);
    }
  };

  const handleSnackBarAlert = () => {
    if (!alertsDataLength) {
      toast.error("Nothing to Export");
    }
  };

  const getThresholdFormattedData = (data) => {
    if (!data) return [];
    const thresholdFormattedData = alertsThresholdData?.map((ele) => ({
      ...ele,
      value: data?.[ele?.label],
    }));
    setAlertsThresholds(thresholdFormattedData);
  };

  return (
    <Stack mt={2}>
      <TypographyPrimary
        sx={{
          textTransform: "capitalize",
          fontSize: "1.8rem",
        }}
      >
        Set Thresholds
      </TypographyPrimary>
      <Stack direction="row" flexWrap="wrap" width="100%" gap={3}>
        {alertsThresholds?.map((ele) =>
          healthDataLoading || openBackdropLoader ? (
            <Skeleton
              height={"170px"}
              sx={{ flexGrow: 1, minWidth: "190px" }}
            />
          ) : (
            <AlertCard
              key={ele?.id}
              paneText={`${
                ele?.label === "heartBeat" ? "heartbeat" : ele?.label
              }`}
              label={ele?.label}
              valueSuffix={ele?.suffix}
              labelData={ele?.value}
              isEdit={ele?.isEdit}
              onChange={(event) => handleThresholdChange(event, ele?.id)}
              onBtnClick={() =>
                ele?.isEdit
                  ? handleThresholdAlertSubmit(ele?.id)
                  : handleThresholdEdit(ele?.id)
              }
            />
          )
        )}
      </Stack>
      <Stack sx={{ width: "100%", py: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText={`showing ${
              alertsDataLength < 10 ? alertsDataLength : 10
            } out of ${alertsDataLength} Alerts`}
            paneTextColor="#000"
            datePicker={true}
            clearBtn={true}
            onClearAll={() => handleAlertDelete(data?.id, "deleteAllAlerts")}
            btnText={
              alertsDataLength ? (
                <ExportAsCSV
                  headers={livestockDetailAlertTableHeadData}
                  data={singleLivestockAlerts}
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
        {openBackdropLoader ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(4).fill("20%")}
          />
        ) : alertsDataLength ? (
          <TableV2
            paneText="showing 10 out of 20 Alerts"
            paneTextColor="#000"
            isBtn={true}
            btnText="export"
            datePicker={true}
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={livestockDetailAlertTableHeadData}
            tableRowData={singleLivestockAlerts
              .map((ele) => ({
                ...ele,
                alarmValue: [
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "1.6rem",
                      fontWeight: "bold",
                      color: "red",
                    }}
                  >
                    {ele?.alarmValue}
                  </Typography>,
                ],
                action: [
                  <IconButton aria-label="delete">
                    <DeleteOutlineOutlinedIcon
                      fontSize="large"
                      onClick={() => handleAlertDelete(ele.id)}
                    />
                  </IconButton>,
                ],
              }))
              .map((ele) => {
                delete ele.id;
                return ele;
              })}
          />
        ) : null}

        {singleLivestockAlerts?.length ? (
          alertsDataLength > 10 ? (
            <Stack direction="row" justifyContent="center" pt={5}>
              <CustomPagination
                size="large"
                count={pageCount}
                page={paginationPageNo}
                onPageChange={(pageNo) => setPaginationPageNo(pageNo)}
              />
            </Stack>
          ) : null
        ) : (
          !openBackdropLoader && <NoData />
        )}
      </Stack>
    </Stack>
  );
};

export default Alerts;
