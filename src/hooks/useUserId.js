const useUserId = () => {
  let userId =
    JSON.parse(window?.localStorage?.getItem("userData"))?.userId || "";
  return userId;
};

export default useUserId;
