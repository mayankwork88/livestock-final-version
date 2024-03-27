import { useQuery } from "react-query";
import { getAllLivestockBy } from "../apis/services";
import { useNavigate } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";
import { CustomLabel } from "../../../../ComponentsV2";
import {
  DeleteOutlineOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";

const deviceFormattedData = (
  data,
  navigate,
  formattedDate,
  handleLivestockUnassign
) => {
  if (!data?.length) return [];

  return data?.map((ele) => ({
    uid: ele?.uID,
    livestockName: ele?.name,
    collarID: ele?.assignedDevice?.collarDevice?.uID || "N/A",
    createdOn: formattedDate(ele?.createdAt, false),
    currentStatus: (
      <CustomLabel
        text={ele?.liveStocklocationStatus || "N/A"}
        type={
          ele?.liveStocklocationStatus?.toLowerCase() === "safe"
            ? "success"
            : "error"
        }
        width={125}
        marginAuto={false}
      />
    ),
    lastUpdate: formattedDate(ele?.updatedAt, true),
    action: [
      <VisibilityOutlinedIcon
        fontSize="large"
        onClick={() => {
          navigate(`/livestocks/${ele?._id}`);
          localStorage.setItem("currentTab", 0);
        }}
      />,
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        onClick={() => handleLivestockUnassign(ele?._id)}
      />,
    ],
  }));
};

const useGetAllLivestock = (
  userId,
  pagination,
  query,
  status,
  handleLivestockUnassign
) => {
  const { isFetching, error, data } = useQuery(
    ["getAllLivestock", query, pagination, status],
    () => getAllLivestockBy(userId, pagination, query, status)
  );
  const navigate = useNavigate();
  const { formattedDate } = useDateFormat();

  return {
    isLoading: isFetching,
    error,
    livestock: deviceFormattedData(
      data?.data?.data?.liveStockData,
      navigate,
      formattedDate,
      handleLivestockUnassign
    ),
    dataLength: data?.data?.data?.dataLength,
  };
};

export default useGetAllLivestock;
