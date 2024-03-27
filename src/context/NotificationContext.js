import { createContext, useState, useEffect } from "react";
import { request } from "../apis/axios-utils";
import io from "socket.io-client";
import useUserId from "../hooks/useUserId";
import useErrorMessage from "../hooks/useErrorMessage";
import toast from "react-hot-toast";
import env from "react-dotenv";

export const NotificationContext = createContext();

const LOCAL = "http://localhost:8085/api/v1";
const DEV = "http://shipment.psiborg.io:8085/api/v1";
const PROD = "https://apils.psiborg.io/api/v1";
const BACKEND_URL = PROD || env?.BACKEND_URL || LOCAL;

const socket = io(BACKEND_URL, { transports: ["websocket"] });

export const NotificationContextProvider = ({ children }) => {
  const [selectedNotificationTab, setSelectedNotificationTab] =
    useState("unread");
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);
  const [allUnreadNotifications, setAllUnreadNotifications] = useState([]);
  const [allReadNotifications, setAllReadNotifications] = useState([]);
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [unReadUtils, setUnreadUtils] = useState({
    dataLength: 0,
    paginationPageNo: 1,
    pageCount: 1,
  });
  const [readUtils, setReadUtils] = useState({
    dataLength: 0,
    paginationPageNo: 1,
    pageCount: 1,
  });
  const { getErrorMessage } = useErrorMessage();
  const userId = useUserId();

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  const onSnackbarAlertClose = () => {
    setSnackbarAlert({ open: false, type: "", message: "" });
  };

  const openSnackbarAlert = (type, message) => {
    setSnackbarAlert({
      open: true,
      type,
      message,
    });
  };

  useEffect(() => {
    getAllReadNotification();
  }, [readUtils?.paginationPageNo]);

  useEffect(() => {
    getAllUnreadNotification();
  }, [unReadUtils?.paginationPageNo]);

  useEffect(() => {
    if (userId) {
      socket.emit("login", { userId: userId });
    }

    socket.on("notification", (payload) => {
      setUnreadUtils((prev) => ({ ...prev, dataLength: prev.dataLength + 1 }));
    });
  }, []);

  const handleSocketLogout = () => {
    socket.emit("logout", { userId: userId });
  };

  const getAllUnreadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/getUnreadNotification?page=${unReadUtils?.paginationPageNo}&limit=10`,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllUnreadNotifications(data?.unreadAlertData);
        setOpenBackdropLoader(false);
        setUnreadUtils({
          ...unReadUtils,
          dataLength: data?.dataLength,
          pageCount: data?.pageCount,
        });
      } else {
        setAllUnreadNotifications([]);
        setUnreadUtils({
          ...unReadUtils,
          dataLength: 0,
          pageCount: 1,
        });
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      setAllUnreadNotifications([]);
      setOpenBackdropLoader(false);
    }
  };

  const getAllReadNotification = async () => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/getReadNotification?page=${readUtils?.paginationPageNo}&limit=10`,
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllReadNotifications(data?.readalertData);
        setOpenBackdropLoader(false);
        setReadUtils({
          ...readUtils,
          dataLength: data?.dataLength,
          pageCount: data?.pageCount,
        });
      } else {
        setAllReadNotifications([]);
        setReadUtils({
          ...readUtils,
          dataLength: 0,
          pageCount: 1,
        });
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      setAllReadNotifications([]);
      setOpenBackdropLoader(false);
    }
  };

  const setUnreadToReadNotification = async (alertId) => {
    setOpenBackdropLoader(true);
    try {
      const res = await request({
        url: `/liveStock/updateSingleAltNotification?alertID=${alertId}`,
        method: "PATCH",
      });
      if (res?.status === 200) {
        const { data } = res?.data;
        setAllReadNotifications(data?.unreadAlertData);
        setOpenBackdropLoader(false);
      } else {
        setAllReadNotifications([]);
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      setAllReadNotifications([]);
      toast.success(error?.message);
      setOpenBackdropLoader(false);
    }
  };

  const setAllUnreadToReadNotification = async () => {
    if (allUnreadNotifications?.length) {
      setOpenBackdropLoader(true);
      try {
        const res = await request({
          url: `/liveStock/updateAlertToRead`,
          method: "PATCH",
        });
        if (res?.status === 200) {
          getAllUnreadNotification();
          getAllReadNotification();
          toast.success("Read All Notifications");
          setOpenBackdropLoader(false);
        } else {
          throw new Error(getErrorMessage(res));
        }
      } catch (error) {
        toast.error(error?.message);
        setOpenBackdropLoader(false);
      }
    } else {
      toast.success("Nothing to Read");
    }
  };

  const clearAllReadNotification = async () => {
    if (allReadNotifications?.length) {
      setOpenBackdropLoader(true);
      try {
        const res = await request({
          url: `/liveStock/clearReadNotification`,
          method: "PUT",
        });
        if (res?.status === 200) {
          getAllReadNotification();
          toast.success("Cleared All Notifications");
          setOpenBackdropLoader(false);
        } else {
          throw new Error(getErrorMessage(res));
        }
      } catch (error) {
        toast.error(error?.message);
        setOpenBackdropLoader(false);
      }
    } else {
      toast.success("Nothing to Clear");
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        getAllUnreadNotification,
        allUnreadNotifications,
        allReadNotifications,
        setUnreadToReadNotification,
        setAllUnreadToReadNotification,
        snackbarAlert,
        openBackdropLoader,
        onSnackbarAlertClose,
        selectedNotificationTab,
        setSelectedNotificationTab,
        getAllReadNotification,
        clearAllReadNotification,
        unReadUtils,
        setUnreadUtils,
        readUtils,
        setReadUtils,
        handleSocketLogout,
        logoutLoading, setLogoutLoading
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
