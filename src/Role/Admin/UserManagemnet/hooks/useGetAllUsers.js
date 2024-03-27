import React from "react";
import {
  DeleteOutlineOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../apis/services";
import { useNavigate } from "react-router-dom";

const userFormattedData = (data, navigate, handleDeleteUser) => {
  return data?.data?.data?.data?.map((ele) => ({
    username: ele?.name,
    email: ele?.email,
    collars: ele?.collarCount,
    pedometers: ele?.pedometerCount,
    livestock: ele?.livestockCount,
    actions: [
      <VisibilityOutlinedIcon
        fontSize="large"
        onClick={() => navigate(`${ele?._id}`)}
      />,
      <DeleteOutlineOutlinedIcon
        fontSize="large"
        onClick={() => handleDeleteUser(ele?._id)}
      />,
    ],
  }));
};

const useGetAllUsers = (pagination, handleDeleteUser, searchTerm) => {
  const {
    isLoading,
    error,
    data: users,
  } = useQuery(["adminAllUsers", pagination, searchTerm], () => fetchAllUsers(pagination, searchTerm));

  const navigate = useNavigate();
  return {
    isLoading,
    error,
    data: userFormattedData(users, navigate, handleDeleteUser),
    dataLength: users?.data?.data?.totalCount,
  };
};

export default useGetAllUsers;
