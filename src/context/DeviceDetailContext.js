import React, { createContext, useContext, useState } from "react";
import useErrorMessage from "../hooks/useErrorMessage";
import useCollarContext from "../hooks/useCollarContext";
import { request } from "../apis/axios-utils";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

const DeviceDetailContext = createContext();

export const DeviceDetailContextProvider = ({ children }) => {
  const [isEditCollarInfo, setIsEditCollarInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collarInfoEdit, setCollarInfoEdit] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
  });

  const { getErrorMessage } = useErrorMessage();

  const { isError, setIsError, openSnackbarAlert } = useCollarContext();

  const queryClient = useQueryClient();

  const handleCollarInfoEditChange = (e) => {
    const { name, value } = e.target;
    setCollarInfoEdit({ ...collarInfoEdit, [name]: value });
  };

  const handelCollarNewInfo = async (deviceId) => {
    setIsEditCollarInfo(true);
    if (isEditCollarInfo) {
      setLoading(true);
      const body = {
        deviceName: collarInfoEdit?.collarName,
        uID: collarInfoEdit?.collarUID,
        macID: collarInfoEdit?.collarMacId,
      };
      try {
        const editRes = await request({
          url: `/devices/update?deviceID=${deviceId}`,
          method: "PATCH",
          data: body,
        });
        if (editRes.status === 200) {
          toast.success("Collar successfully edited :)");
          setIsEditCollarInfo(false);
          setIsError({
            error: false,
            message: null,
          });
          queryClient.invalidateQueries(["getDeviceById"]);
        } else if (editRes?.response?.data?.statusCode === 409) {
          setIsError({
            error: true,
            message: editRes?.response?.data?.message,
          });
        } else {
          throw new Error(getErrorMessage(editRes));
        }
      } catch (err) {
        toast.error(err.message);
        setIsEditCollarInfo(false);
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <DeviceDetailContext.Provider
      value={{
        loading,
        handelCollarNewInfo,
        handleCollarInfoEditChange,
        collarInfoEdit,
        setCollarInfoEdit,
        isEditCollarInfo,
      }}
    >
      {children}
    </DeviceDetailContext.Provider>
  );
};

export const useDeviceDetailContext = () => useContext(DeviceDetailContext);
