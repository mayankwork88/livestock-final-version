import { useQuery } from "react-query";
import { getGeofenceAndLivestock } from "../apis/services";
import { useParams } from "react-router-dom";

const formattedLivestockMapData = (data) => {
  if (!data) return [];
  return data?.map((ele) => ({
    id: ele?._id,
    safeUnsafeStatus: ele?.liveStocklocationStatus,
    position: {
      lat: ele?.geolocation?.lat,
      lng: ele?.geolocation?.lng,
    },
  }));
};

const livestockData = (data, filter) => {
  return data
    ?.filter((ele) => ele?.liveStocklocationStatus?.toLowerCase() === filter)
    ?.map((ele) => ({
      liveStockName: ele?.name,
      collar: ele?.assignedDevice?.collarDevice?.deviceName || "N/A",
      pedometer: ele?.assignedDevice?.pedometerDevice?.deviceName || "N/A",
    }));
};

const useGeofenceAndLivestock = (id) => {
  const { isLoading, error, data } = useQuery(["geofenceAndLivestock"], () =>
    getGeofenceAndLivestock(id)
  );
  return {
    isLoading,
    error,
    geofenceData: data?.data?.data?.userGeofence || {},
    allLivestockMapData: formattedLivestockMapData(
      data?.data?.data?.livestock_info
    ),
    safeLivestock: livestockData(data?.data?.data?.livestock_info, "safe"),
    unsafeLivestock: livestockData(data?.data?.data?.livestock_info, "unsafe"),
  };
};

export default useGeofenceAndLivestock;
