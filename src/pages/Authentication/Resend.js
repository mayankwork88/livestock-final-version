import { CircularProgress, Typography } from "@mui/material";
import useAuthContext from "../../hooks/useAuth";

const ResendOTP = ({ onClick, isLoading }) => {
  const { seconds } = useAuthContext();

  return (
    <Typography
      component="h2"
      onClick={seconds === 0 && !isLoading ? onClick : null}
      sx={{
        color: "#fff",
        fontSize: "16px",
        cursor: `${seconds === 0 ? "pointer" : null}`,
        fontWeight: "bold",
        letterSpacing: "1px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {seconds !== 0 ? (
        `Resend OTP in ${seconds} seconds`
      ) : isLoading ? (
        <CircularProgress size={20} sx={{ color: "#fff" }} />
      ) : (
        "Resend"
      )}
    </Typography>
  );
};

export default ResendOTP;
