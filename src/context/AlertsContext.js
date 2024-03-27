import { useState, useEffect, createContext } from "react";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";
import useErrorMessage from "../hooks/useErrorMessage";
import toast from "react-hot-toast";

export const AlertsContext = createContext();

export const AlertsContextProvider = ({ children }) => {
  const { getErrorMessage } = useErrorMessage();
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });
  const [alertDeletedId, setAlertDeletedId] = useState();
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };
  const [AllAlertData, setAllAlertData] = useState();
  const [pageCount, setPageCount] = useState(1);
  const [alertsDataLength, setAlertsDataLength] = useState();
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const pageLimit = 10;

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const { formattedDate, paginationDateFormat } = useDateFormat();

  const getAllAlerts = () => {
    setOpenBackdropLoader(true);
    request({
      url: `/liveStock/getUsersLiveStockAllAlerts?startDate=${paginationDateFormat(
        selectedDate[0]?.startDate
      )}&page=${paginationPageNo}&limit=${pageLimit}&endDate=${paginationDateFormat(
        selectedDate[0]?.endDate
      )}`,
    })
      .then((res) => {
        if (res?.status === 200) {
          const data = res?.data?.data?.alertData || [];
          const formattedData = data?.map((alert) => ({
            id: alert?._id,
            alertName: alert?.message,
            collarUid: alert?.assignedDevice?.uID,
            livestockName: alert?.liveStockName,
            thresholdValue: alert?.thresholdValue,
            alarmValue: alert?.alertValue,
            time: formattedDate(alert?.createdAt, "time"),
            date: formattedDate(alert?.createdAt, "date"),
          }));
          setAllAlertData(formattedData);
          setPageCount(res?.data?.data?.pageCount);
          setAlertsDataLength(res?.data?.data?.dataLength || 0);
        } else {
          const msg = getErrorMessage(res);
          setAllAlertData([]);
          setPageCount(0);
          setAlertsDataLength(0);
          throw new Error(msg);
        }
      })
      .catch((err) => {
        const firstLoad =
          formattedDate(new Date(), "date") ===
            formattedDate(selectedDate[0].startDate, "date") &&
          formattedDate(new Date(), "date") ===
            formattedDate(selectedDate[0].endDate, "date");
        if (!firstLoad) toast.error(err.message);
      })
      .finally(() => setOpenBackdropLoader(false));
  };

  // GET ALL ALERTS
  useEffect(() => {
    getAllAlerts();
  }, [selectedDate, paginationPageNo]);

  //HANDLE ALERT DELETE
  const handleAlertDelete = (alertId) => {
    if (alertsDataLength) {
      setShowConfirmModal({ open: true, confirmBtn: true });
      setAlertDeletedId(alertId);
    } else {
      toast.error("error", "Nothing to Clear");
    }
  };

  const handleAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/DeleteLiveStockAlerts?alertID=${alertDeletedId}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        toast.success("Alert successfully deleted!");
        getAllAlerts();
        // setTimeout(() => window.location.reload(), 500);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      const msg = error?.message;
      setOpenBackdropLoader(false);
      toast.error(msg);
    }
  };

  const handleAllAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: "/liveStock/deleteAllAlerts",
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        toast.success("All Alerts successfully deleted!");
        // setTimeout(() => window.location.reload(), 500);
        getAllAlerts();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      const msg = err?.message || getErrorMessage(err);
      setOpenBackdropLoader(false);
      toast.error(msg);
    }
  };

  return (
    <AlertsContext.Provider
      value={{
        handleAlertDelete,
        handleAlertDeleteConfirm,
        showConfirmModal,
        handleConfirmWindowClose,
        handleAlertDeleteConfirm,
        snackbarAlert,
        onSnackbarAlertClose,
        openBackdropLoader,
        selectedDate,
        setSelectedDate,
        AllAlertData,
        pageCount,
        paginationPageNo,
        setPaginationPageNo,
        alertsDataLength,
        alertDeletedId,
        handleAllAlertDeleteConfirm,
        openSnackbarAlert,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};
