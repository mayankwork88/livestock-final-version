import { Box, Stack } from "@mui/material";
import { NoDataImg } from "../assets";


const NoData = (width=400) => {
  return (
    <Stack width="100%" direction="row" justifyContent="center" py={4}>
    <Box component="img" width={width} height={width} src={NoDataImg}/>
  </Stack>
  );
}

export default NoData;
