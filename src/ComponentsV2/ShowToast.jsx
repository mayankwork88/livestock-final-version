import { Toaster } from "react-hot-toast";

const ShowToast = () => {
  return (
    <Toaster
      position="top-left"
      gutter={12}
      containerStyle={{ margin: "8px" }}
      toastOptions={{
        success: {
          duration: 3000,
        },
        error: {
          duration: 3000,
        },
        style: {
          fontSize: "16px",
          maxWidth: "500px",
          padding: "16px 24px",
          backgroundColor: "#fff",
          color: "#222",
        },
      }}
    />
  );
};

export default ShowToast;
