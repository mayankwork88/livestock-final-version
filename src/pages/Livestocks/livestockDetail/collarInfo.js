import React, { useState, useEffect } from "react";
import { Stack } from "@mui/material";
import { AddBtn, CustomModal, Skeleton } from "../../../ComponentsV2";
import ShowLivestocks from "../../Collars/viewCollarDetails/showLivestocks";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { deviceInfoData } from "../Data";
import useErrorMessage from "../../../hooks/useErrorMessage";
import DeviceCard from "../components/DeviceCard";
import toast from "react-hot-toast";
import ShowQRModalContent from "../../PDFPage/ShowQRModalContent";

const CollarInfo = ({
  data,
  collarLoading,
  setCollarLoading,
  pedometerLoading,
  setPedometerLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [allUnassignCollars, setAllUnassignCollars] = useState({
    collarData: [],
    dataLength: 0,
  });
  const [unassignDevicePagination, setUnassignDevicePagination] = useState(1);
  const [choseDevice, setChoseDevice] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const [isInputChange, setIsInputChange] = useState(false);
  const [query, setQuery] = useState("");
  const [collarLoader, setCollarLoader] = useState(false);
  const [pedometerLoader, setPedometerLoader] = useState(false);
  const { openSnackbarAlert, getAllLivestock, openBackdropLoader } =
    useLivestockContext();
  const { getErrorMessage } = useErrorMessage();

  useEffect(() => {
    if (!data?.collarUid) {
    }
  }, [data]);

  const loadingOn = (type) =>
    type?.toLowerCase() === "collar"
      ? setCollarLoader(true)
      : setPedometerLoader(true);
  const loadingOff = (type) =>
    type?.toLowerCase() === "collar"
      ? setCollarLoader(false)
      : setPedometerLoader(false);

  const loader = (type) =>
    type?.toLowerCase() === "collar"
      ? setCollarLoading(!collarLoading)
      : setPedometerLoading(!pedometerLoading);

  useEffect(() => {
    if (query || isInputChange) {
      const timeout = setTimeout(
        () => getUnassignCollars(choseDevice, query, unassignDevicePagination),
        1000
      );
      return () => clearTimeout(timeout);
    }
  }, [query]);

  const handelCollarRemove = async (type) => {
    loadingOn(type);
    const body = {
      liveStockID: data?.id,
      deviceID: data?.[`${type}`]?._id,
    };
    try {
      const res = await request({
        url: `/devices/unassign-liveStock?unassignType=${type}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        loader(type);
        const msg = `${
          type?.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
        } successfully Removed :)`;
        toast.success(msg);
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      loadingOff(type);
    }
  };

  const getUnassignCollars = async (type, searchTerm = "", page = 1) => {
    loadingOn(type);
    try {
      const res = await request({
        url: `/devices/getFreeDeviceOfUser?deviceType=${type}&page=${page}&limit=${9}&searchTerm=${searchTerm}`,
      });
      if (res.status === 200) {
        const { UserFreeDeviceInfo, dataLength } = res?.data?.data;
        setAllUnassignCollars({
          collarData: UserFreeDeviceInfo,
          dataLength: dataLength,
        });
        setShowModal(true);
      } else {
        setAllUnassignCollars({
          collarData: [],
          dataLength: 0,
        });
        throw new Error(getErrorMessage(res));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      loadingOff(type);
    }
  };

  const handleCollarAssign = async (selectedValue, type) => {
    loadingOn(choseDevice);
    const body = {
      liveStockID: data?.id,
      deviceID: selectedValue,
    };
    try {
      const res = await request({
        url: `/devices/assign-liveStock?assignType=${choseDevice}`,
        method: "POST",
        data: body,
      });
      if (res.status === 200) {
        loader(choseDevice);
        setShowModal(false);
        const msg = `${
          choseDevice?.charAt(0).toUpperCase() +
          choseDevice.slice(1).toLowerCase()
        } successfully Added :)`;
        toast.success(msg);
        getAllLivestock();
      } else {
        throw new Error(getErrorMessage(res));
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      loadingOff(choseDevice);
    }
  };

  const getData = (data) => {
    return {
      status: data?.deviceActiveStatus,
      uid: data?.uID,
      name: data?.deviceName,
      macId: data?.macID,
      addedOn: data?.createdAt,
      battery: data?.batteryPercent,
    };
  };

  return (
    <>
      <Stack direction={"row"} gap={4} py={2}>
        {openBackdropLoader ? (
          <Skeleton width="50%" height={420} />
        ) : data?.collar?.uID ? (
          <DeviceCard
            label="collar"
            data={getData(data?.collar)}
            loading={collarLoader}
            deviceDataFormat={deviceInfoData}
            onRemove={() => handelCollarRemove("collar")}
            handleQRClick={() => {
              setChoseDevice({ type: "collar", id: data?.collar?.macID });
              setShowQRModal(true);
            }}
          />
        ) : (
          <AddBtn
            text1="collar"
            text2="livestock"
            // loading={!showModal && collarLoading}
            loading={collarLoader}
            onClick={() => {
              setChoseDevice("collar");
              getUnassignCollars("collar");
            }}
          />
        )}
        {openBackdropLoader ? (
          <Skeleton width="50%" height={420} />
        ) : data?.pedometer?.uID ? (
          <DeviceCard
            label="pedometer"
            data={getData(data?.pedometer)}
            deviceDataFormat={deviceInfoData}
            loading={pedometerLoader}
            onRemove={() => handelCollarRemove("pedometer")}
            handleQRClick={() => {
              setShowQRModal(true);
              setChoseDevice({ type: "pedometer", id: data?.pedometer?.macID });
            }}
          />
        ) : (
          <AddBtn
            text1="Pedometer"
            text2="livestock"
            loading={pedometerLoader}
            onClick={() => {
              setChoseDevice("pedometer");
              getUnassignCollars("pedometer");
            }}
          />
        )}
      </Stack>

      <CustomModal
        content={
          <ShowQRModalContent id={choseDevice?.id} title={choseDevice?.type} />
        }
        customWidth="25%"
        customWidthMd="40%"
        customWidthSm="50%"
        openModal={showQRModal}
        handleClose={() => {
          setShowQRModal(false);
          setChoseDevice("");
        }}
      />
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignCollars?.collarData}
            dataLength={allUnassignCollars?.dataLength}
            pagination={unassignDevicePagination}
            setPagination={(page) => {
              setUnassignDevicePagination(page);
              getUnassignCollars(choseDevice, query, page);
            }}
            onSubmit={handleCollarAssign}
            setOpenAddLivestockModal={() => setShowModal(false)}
            loading={choseDevice === "collar" ? collarLoader : pedometerLoader}
            openSnackbarAlert={() =>
              toast.error(`Please choose a ${choseDevice} to assign`)
            }
            onSearch={(term) => {
              setQuery(term);
              setIsInputChange(true);
            }}
          />
        }
        openModal={showModal}
        handleClose={() => {
          setShowModal(false);
          setUnassignDevicePagination(1);
        }}
      />
    </>
  );
};

export default CollarInfo;
