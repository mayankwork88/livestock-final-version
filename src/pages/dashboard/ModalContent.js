import { Button, Stack, Typography, Box } from "@mui/material";
import { CompleteProfileImg } from "../../assets";
import { useNavigate } from "react-router-dom";

const ModalContent = ({ setHandleModal }) => {
  const navigate = useNavigate();
  const style = {
    fontWeight: "bold",
    color: "#8F8F8F",
  };
  return (
    <Stack
      p={3}
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Box component="img" width={200} height={200} src={CompleteProfileImg} />
      <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
        <Typography variant="h4" sx={style}>
          Thanks for Registration
        </Typography>
        <Typography variant="h4" sx={style}>
          We need few details from you
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap={1}>
        <Button
          variant="contained"
          size="large"
          sx={{ fontWeight: "bold", fontSize: 14 }}
          onClick={() => {
            navigate("/profile");
            setHandleModal();
          }}
        >
          Complete Profile
        </Button>
        <Button
          onClick={() => {
            navigate("/");
            setHandleModal();
          }}
          sx={{ ...style, fontSize: 14, textTransform: "capitalize" }}
        >
          I'll do it later
        </Button>
      </Box>
    </Stack>
  );
};

export default ModalContent;
