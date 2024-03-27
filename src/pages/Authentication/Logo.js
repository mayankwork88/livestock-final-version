import { Box, Typography } from "@mui/material";
import { CompanyLogoWithBG } from "../../assets";

const Logo = () => {
  return (
    <>
      <Box
        component="img"
        sx={{
          width: 150,
          height: 150,
          objectFit: "cover",
          borderRadius: "10px",
        }}
        src={CompanyLogoWithBG}
        alt="logo"
      />
      <Box>
        <Typography
          variant="h2"
          sx={{
            fontSize: "2rem",
            textAlign: "center",
            fontFamily: '"PT Sans", sans-serif',
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "2px",
            color: "#fff",
          }}
        >
          ALBARN
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontSize: "1.4rem",
            textAlign: "center",
            fontFamily: '"PT Sans", sans-serif',
            fontWeight: "bold",
            textTransform: "capitalize",
            letterSpacing: "1px",
            color: "#fff",
            mt: 1,
          }}
        >
          Cattle Management System
        </Typography>
      </Box>
      {/* <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
        Livestock Monitoring
      </Typography> */}
    </>
  );
};

export default Logo;
