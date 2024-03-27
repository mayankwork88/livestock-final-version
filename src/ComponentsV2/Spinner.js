import { Stack, CircularProgress } from "@mui/material";

const Spinner = ({size=50, color, sx}) => {
  return (
    <Stack
      width={"100%"}
      height={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress sx={{color:color,...sx}} size={size} />
    </Stack>
  );
};

export default Spinner;
