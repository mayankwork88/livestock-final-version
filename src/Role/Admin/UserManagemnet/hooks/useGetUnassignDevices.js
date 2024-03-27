import { useQuery } from "react-query";
import { getUnassignDevicesApi } from "../apis/services";

const useGetUnassignDevices = (deviceType, pagination, query) => {
  const { isLoading, error, data } = useQuery(
    ["getUnassignedDevices", deviceType, pagination, query],
    () => getUnassignDevicesApi(deviceType, pagination, query)
  );

  return {
    unassignDevicesLoading: isLoading,
    unassignDevicesError: error,
    unassignDevicesData: data?.data?.data?.UserFreeDeviceInfo || [],
    unassignDevicesDataLength: data?.data?.data?.dataLength || 0,
  };
};

export default useGetUnassignDevices;
