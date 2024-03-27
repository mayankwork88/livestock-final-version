import { useQuery } from "react-query";
import { getAllDevices } from "../apis/services";
import {
  DeleteOutlineOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";
import { CustomLabel } from "../../../../ComponentsV2";
import { useNavigate } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";

const deviceFormattedData = (
  data,
  navigate,
  formattedDate,
  deviceType,
  handleCollarUnassign
) => {
  if (!data?.length) return [];

  return data?.map((ele) => ({
    uid: ele?.uID,
    name: ele?.deviceName,
    status: (
      <CustomLabel
        text={ele?.deviceActiveStatus ? "ON" : "OFF"}
        type={ele?.deviceActiveStatus ? "success" : "error"}
        width={80}
        marginAuto={false}
      />
    ),
    assignedStatus: (
      <CustomLabel
        text={ele?.status ? "assigned" : "not assigned"}
        type={ele?.status ? "success" : "error"}
        width={125}
        marginAuto={false}
      />
    ),
    addedOn: formattedDate(ele?.createdAt, false),
    actions: [
      <VisibilityOutlinedIcon
        fontSize="large"
        onClick={() => {
          localStorage.setItem("currentTab", 0);
          navigate(`/devices/${deviceType}/${ele?._id}`);
        }}
      />,
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        onClick={() => handleCollarUnassign(ele?._id)}
      />,
    ],
  }));
};

const useGetAllDevices = (
  userId,
  deviceType,
  pagination,
  query,
  handleCollarUnassign
) => {
  const navigate = useNavigate();
  const { formattedDate } = useDateFormat();

  const { isLoading, error, data } = useQuery(
    ["getAllDevices", deviceType, pagination, userId, query],
    () => getAllDevices(userId, deviceType, pagination, query)
  );

  return {
    isLoading,
    error,
    devices: deviceFormattedData(
      data?.data?.data?.deviceData,
      navigate,
      formattedDate,
      deviceType,
      handleCollarUnassign
    ),
    dataLength: data?.data?.data?.dataLength,
  };
};

export default useGetAllDevices;
