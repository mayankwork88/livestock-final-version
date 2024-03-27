import useDateFormat from "../../../../hooks/useDateFormat";
import { DeleteOutlineOutlinedIcon } from "../../../../icons";
import { getAllAlertsById } from "../apis/services";
import { useQuery } from "react-query";

const formattedData = (data, formattedDate) => {
  return data?.alertData?.map((alert) => ({
    alertName: alert?.message,
    collarUid: alert?.assignedDevice?.uID,
    livestockName: alert?.liveStockName,
    thresholdValue: alert?.thresholdValue,
    alarmValue: alert?.alertValue,
    time: formattedDate(alert?.createdAt, "time"),
    date: formattedDate(alert?.createdAt, "date"),
    action: [<DeleteOutlineOutlinedIcon fontSize="large" onClick={() => {}} />],
  }));
};

const useGetAllAlerts = (userId, pagination, selectedDate) => {
  const { formattedDate } = useDateFormat();
  const { isLoading, error, data } = useQuery(
    ["getAllAlertsByUserId", userId, pagination, selectedDate],
    () => getAllAlertsById(userId, pagination, selectedDate)
  );

  return {
    isLoading,
    error,
    alerts: formattedData(data?.data?.data, formattedDate),
    dataLength: data?.data?.data?.dataLength || 0,
  };
};

export default useGetAllAlerts;
