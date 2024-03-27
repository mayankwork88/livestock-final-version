import moment from "moment/moment";
import { request } from "../../../../apis/axios-utils";

export const fetchAllUsers = (pagination, searchTerm) => {
  return request({
    url: `/user/getAll?page=${pagination}&limit=10&searchTerm=${searchTerm}`,
  });
};

export const addNewUser = (body) => {
  return request({
    url: `/user/create`,
    method: "POST",
    data: body,
  });
};

export const deleteUser = (userId) => {
  return request({
    url: `user/deleteUserByAdmin?userId=${userId}`,
    method: "DELETE",
  });
};

export const getGeofenceAndLivestock = (userId) => {
  return request({
    url: `/liveStock/safeUnsafeLiveStock?userId=${userId}`,
  });
};

export const getAllDevices = (userId, deviceType, pagination, query) =>
  request({
    url: `/devices/getDeviceByUserId?userId=${userId}&deviceType=${deviceType}&page=${pagination}&limit=${10}&searchTerm=${query}&status=all`,
  });

export const getUnassignDevicesApi = (deviceType, pagination, query) =>
  request({
    url: `/devices/getFreeDeviceOfUser?deviceType=${deviceType}&page=${pagination}&limit=${10}&searchTerm=${query}&assignedStatus=false`,
  });

export const assignCollarToUserApi = (body) => {
  return request({
    url: `/user/assign-device`,
    method: "POST",
    data: body,
  });
};

export const unassignDeviceToUserApi = (body) => {
  return request({
    url: `/user/unassign-device`,
    method: "POST",
    data: body,
  });
};

export const getAllLivestockBy = (userId, pagination, query, status) =>
  request({
    url: `/liveStock/getAll?userId=${userId}&page=${pagination}&limit=${10}&searchTerm=${query}&status=${status}`,
  });

export const getUnassignLivestock = (pagination, query) =>
  request({
    url: `liveStock/getAll?searchTerm=${query}&page=${pagination}&limit=10&assignedStatus=false`,
  });

export const assignLivestockToUserApi = (body) => {
  return request({
    url: `/user/assignLivestock`,
    method: "POST",
    data: body,
  });
};

export const unassignLivestockToUserApi = (body) => {
  return request({
    url: `/user/unassignLivestock`,
    method: "POST",
    data: body,
  });
};

export const getAllAlertsById = (userId, pagination, selectedDate) =>
  request({
    url: `/liveStock/getUsersLiveStockAllAlerts?userId=${userId}&startDate=${moment(
      selectedDate[0]?.startDate
    ).format("YYYY-MM-DD")}&page=${pagination}&limit=${10}&endDate=${moment(
      selectedDate[0]?.endDate
    ).format("YYYY-MM-DD")}`,
  });
