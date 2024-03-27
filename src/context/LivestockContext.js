import { createContext, useState, useEffect } from "react";
import { VisibilityOutlinedIcon, DeleteOutlineOutlinedIcon } from "../icons";
import { CustomLabel } from "../ComponentsV2";
import { useNavigate } from "react-router-dom";
import { request } from "../apis/axios-utils";
import useDateFormat from "../hooks/useDateFormat";
import useErrorMessage from "../hooks/useErrorMessage";
import toast from "react-hot-toast";

const livestockInitial = {
  collarUID: "",
  pedometerUID: "",
  livestockUID: "",
  livestockName: "",
  livestockGender: "",
  livestockDOB: new Date(),
};

export const LivestockContext = createContext();

export const LivestockContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const { getErrorMessage } = useErrorMessage();

  const [allLivestocks, setAllLivestocks] = useState([]);
  const [modalContentType, setModalContentType] = useState("add");
  const [openAddLiveStockModal, setOpenAddLivestockModal] = useState(false);
  const [showLocationTab, setShowLocationTab] = useState("location");
  const [isError, setIsError] = useState({ error: false, message: "" });
  const [livestockSort, setLivestockSort] = useState("recent");
  const [livestockSearch, setLivestockSearch] = useState("");
  const [livestockTabControl, setLivestockTabControl] = useState(0);

  // new livestock
  const [addNewLivestock, setAddNewLivestock] = useState(livestockInitial);
  const [addNewLivestockLoading, setAddNewLivestockLoading] = useState(false);
  const [livestockAlertClear, setLivestockAlertClear] = useState(false);

  //BACKDROP
  const [openBackdropLoader, setOpenBackdropLoader] = useState(false);

  //SNACKBAR ALERT
  const [snackbarAlert, setSnackbarAlert] = useState({
    open: false,
    type: "",
    message: "",
  });

  //CONFIRM MODAL
  const [showConfirmModal, setShowConfirmModal] = useState({
    open: false,
    confirmBtn: false,
  });

  const [deleteLivestockId, setDeleteLivestockId] = useState(null);
  const [alertDeletedId, setAlertDeletedId] = useState({
    id: null,
    type: null,
  });
  const { formattedDate, paginationDateFormat } = useDateFormat();
  const [liveStockImage, setLiveStockImage] = useState(null);

  // PAGINATION AND RANGE DATE
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [fetchOnce, setFetchOnce] = useState(false);
  const [alertsDataLength, setAlertsDataLength] = useState(0);
  const [paginationPageNo, setPaginationPageNo] = useState(1);
  const [livestockPagination, setLivestockPagination] = useState(1);
  const [paginationSafe, setPaginationSafe] = useState(1);
  const [paginationUnsafe, setPaginationUnsafe] = useState(1);
  const [livestockDataLength, setLiveStockDataLength] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const pageLimit = 10;

  const getPagination = (status) => {
    const label = status?.toString()?.toLowerCase();
    if (label === "safe") return paginationSafe;
    else if (label === "unsafe") return paginationUnsafe;
    else return livestockPagination;
  };

  const getAllLivestock = (status) => {
    const pag = getPagination(status);
    setOpenBackdropLoader(true);
    const stat = status?.toString()?.length ? `status=${status}` : ``;
    request({
      url: `/liveStock/getAll?page=${pag}&limit=${10}&${stat}&searchTerm=${livestockSearch}&sortTerm=${livestockSort}`,
    })
      .then((res) => {
        if (res.status === 200) {
          const { liveStockData, dataLength } = res?.data?.data;
          const formattedData = liveStockData?.map((col) => {
            return {
              id: col._id + "_id_",
              liveStockUID: col?.uID || "N/A",
              livestockName: col?.name,
              collarID: col?.assignedDevice?.collarDevice?.uID || "N/A",
              pedometerID: col?.assignedDevice?.pedometerDevice?.uID || "N/A",
              addedOn: formattedDate(col?.createdAt, false),
              status: col?.liveStocklocationStatus,
              currentStatus: (
                <CustomLabel
                  text={col?.liveStocklocationStatus || "N/A"}
                  type={
                    col?.liveStocklocationStatus?.toLowerCase() === "safe"
                      ? "success"
                      : "error"
                  }
                  width={125}
                  marginAuto={false}
                />
              ),
              lastUpdate: formattedDate(col?.updatedAt, true),
              action: [
                <VisibilityOutlinedIcon
                  fontSize="large"
                  onClick={() => {
                    navigate(`/livestocks/${col?._id}`);
                    localStorage.setItem("currentTab", 0);
                    setLivestockTabControl(0);
                    localStorage.setItem(
                      "livestockBreadcrumb",
                      JSON.stringify([
                        { label: col?.uID, link: `livestocks/${col?._id}` },
                      ])
                    );
                  }}
                />,
                <DeleteOutlineOutlinedIcon
                  fontSize="large"
                  onClick={() =>
                    handleLivestockDelete(
                      col?._id,
                      col?.assignedDevice?.collarDevice?.uID ||
                        col?.assignedDevice?.pedometerDevice?.uID
                    )
                  }
                />,
              ],
            };
          });
          setAllLivestocks(formattedData);
          setLiveStockDataLength(dataLength);
        } else {
          setAllLivestocks([]);
          setLiveStockDataLength(0);
          throw new Error(res);
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setOpenBackdropLoader(false));
  };

  // handle modal open
  const handleLivestockModalOpen = (type) => {
    setModalContentType(type);
    setOpenAddLivestockModal(true);
  };
  // handle livestock modal close
  const handleLivestockModalClose = () => {
    setOpenAddLivestockModal(false);
    setAddNewLivestock(livestockInitial);
  };

  //HANDLE LIVESTOCK DELETE
  const handleLivestockDelete = async (livestockId, isCollarAssign) => {
    if (isCollarAssign) {
      setShowConfirmModal({ open: true, confirmBtn: false });
    } else {
      setShowConfirmModal({ open: true, confirmBtn: true });
    }
    setDeleteLivestockId(livestockId);
  };

  const handleLivestockDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    const res = await request({
      url: `/liveStock/delete?liveStockID=${deleteLivestockId}`,
      method: "DELETE",
    });
    if (res?.status === 200) {
      setOpenBackdropLoader(false);
      toast.success("Livestock successfully deleted!");
      getAllLivestock();
    } else {
      setOpenBackdropLoader(false);

      toast.error(getErrorMessage(res));
    }
  };
  // HANDLE ADD COLLAR
  const handleAddLivestockChange = (data) => {
    const { name, value } = data.target;
    setAddNewLivestock({ ...addNewLivestock, [name]: value });
  };

  const handleAddLivestock = async () => {
    setAddNewLivestockLoading(true);
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };

    const formData = new FormData();
    formData.append("uID", addNewLivestock?.livestockUID);
    formData.append("name", addNewLivestock?.livestockName);
    formData.append("gender", addNewLivestock?.livestockGender);
    formData.append("dob", paginationDateFormat(addNewLivestock?.livestockDOB));
    formData.append("pedometerID", addNewLivestock?.pedometerUID);
    formData.append("collarID", addNewLivestock?.collarUID);
    formData.append("liveStockImage", liveStockImage);

    try {
      const res = await request({
        url: "/liveStock/create",
        method: "POST",
        data: formData,
        config,
      });
      if (res?.status === 200) {
        handleAddLivestockModalClose();
        const msg = res?.data?.message || "Livestock successfully Added!";
        toast.success(msg);
        getAllLivestock();
      } else {
        if (res?.response?.status === 409) {
          setIsError({
            error: true,
            message: res?.response?.data?.message,
          });
        } else {
          throw new Error(getErrorMessage(res));
        }
      }
    } catch (error) {
      const msg = error?.message;
      toast.error(msg);
    } finally {
      setAddNewLivestockLoading(false);
    }
  };

  const handleAddLivestockModalClose = () => {
    handleLivestockModalClose();
    setAddNewLivestock(livestockInitial);
    setIsError({ error: false, message: "" });
  };

  //SNACKBAR
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

  // CONFIRM MODAL
  const handleConfirmWindowClose = () => {
    setShowConfirmModal({ open: false, confirmBtn: false });
  };

  // HANDLE ALERT DELETE
  const handleAlertDelete = (id, type) => {
    if (alertsDataLength) {
      setShowConfirmModal({ open: true, confirmBtn: true });
      setAlertDeletedId({ id, type });
    } else {
      toast.error("Nothing to Clear");
    }
  };

  const handleAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/DeleteLiveStockAlerts?alertID=${alertDeletedId?.id}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        toast.success("Alert successfully deleted!");
        setLivestockAlertClear((prev) => !prev);
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      const msg = err?.message;
      setOpenBackdropLoader(false);
      toast.error(msg);
    }
  };

  const handleAllAlertDeleteConfirm = async () => {
    setOpenBackdropLoader(true);
    handleConfirmWindowClose();
    try {
      const res = await request({
        url: `/liveStock/deleteLivestockAlertsData?livestock_id=${alertDeletedId?.id}`,
        method: "DELETE",
      });
      if (res?.status === 200) {
        setOpenBackdropLoader(false);
        toast.success("All alert successfully deleted!");
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      const msg = err?.message;
      setOpenBackdropLoader(false);
      toast.error(msg);
    }
  };

  return (
    <LivestockContext.Provider
      value={{
        allLivestocks,
        modalContentType,
        handleLivestockModalOpen,
        openAddLiveStockModal,
        setOpenAddLivestockModal,
        allLivestocks,
        showLocationTab,
        setShowLocationTab,
        handleLivestockModalClose,
        addNewLivestock,
        setAddNewLivestock,
        handleAddLivestockChange,
        addNewLivestockLoading,
        setAddNewLivestockLoading,
        handleAddLivestock,
        openSnackbarAlert,
        onSnackbarAlertClose,
        showConfirmModal,
        handleConfirmWindowClose,
        handleAddLivestockModalClose,
        snackbarAlert,
        onSnackbarAlertClose,
        handleLivestockDeleteConfirm,
        openSnackbarAlert,
        openBackdropLoader,
        selectedDate,
        setSelectedDate,
        paginationPageNo,
        setPaginationPageNo,
        pageCount,
        setPageCount,
        pageLimit,
        handleAlertDelete,
        handleAlertDeleteConfirm,
        alertDeletedId,
        handleAllAlertDeleteConfirm,
        setOpenBackdropLoader,
        isError,
        setIsError,
        alertsDataLength,
        setAlertsDataLength,
        setLiveStockImage,
        liveStockImage,
        getAllLivestock,
        livestockDataLength,
        livestockPagination,
        setLivestockPagination,
        paginationSafe,
        setPaginationSafe,
        paginationUnsafe,
        setPaginationUnsafe,
        livestockSort,
        setLivestockSort,
        livestockSearch,
        setLivestockSearch,
        livestockTabControl,
        setLivestockTabControl,
        fetchOnce,
        setFetchOnce,
        livestockAlertClear,
      }}
    >
      {children}
    </LivestockContext.Provider>
  );
};
