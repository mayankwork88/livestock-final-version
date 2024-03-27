
const useErrorMessage = () => {
  const getErrorMessage = (res) => {
    return (
      res?.response?.data?.message ||
      res?.message ||
      "Server error, try again later"
    );
  };
  return {
    getErrorMessage,
  };
};
export default useErrorMessage;
