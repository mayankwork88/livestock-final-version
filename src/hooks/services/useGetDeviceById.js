import { request } from "../../apis/axios-utils";
import { useQuery } from "react-query";

const getDeviceById = (id) =>
  request({
    url: `/devices/getDeviceByID?deviceID=${id}`,
  });

const formattedData = (data) => {
  let formattedData = {
    collarId: data?._id,
    livestockId: data?.liveStock?._id,
    collarUid: data?.uID,
    collarName: data?.deviceName,
    collarMacId: data?.macID,
    status: data?.deviceActiveStatus ? "online" : "offline",
    networkStrength: data?.NetworkStrength,
    collarBattery: data?.batteryPercent,
    pedometerBattery: data?.batteryPercent,
    Uid: data?.liveStock?.uID,
    name: data?.liveStock?.name,
    gender: data?.liveStock?.gender,
    img: data?.liveStock?.imgPath,
  };

  return formattedData;
};

const useGetDeviceById = (id) => {
  const { isLoading, error, data } = useQuery(["getDeviceById"], ()=>getDeviceById(id));

  return {
    isLoading,
    error,
    deviceData: formattedData(data?.data?.data),
  };
};

export default useGetDeviceById;
