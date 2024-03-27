import { request } from "./axios-utils";

export const getProfileDetails = (id) => {
  return request({ url: `/user/getUpdatedUserData?userId=${id}` });
};
