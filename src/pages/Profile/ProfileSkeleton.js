import { Box, Stack } from "@mui/material";
import { Skeleton } from "../../ComponentsV2";

const ProfileSkeleton = () => {
  return (
    <Stack
      p="20px 15px"
      borderRadius={"10px"}
      border="1px solid #dddddd"
      gap={3}
    >
      <Box sx={{ display: "flex", gap: 3 }}>
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Skeleton width="100%" height={50} />
        <Skeleton width="100%" height={50} />
      </Box>
      <Box sx={{ display: "flex", gap: 3 }}>
        <Skeleton width="100%" height={125} />
        <Box
          width="100%"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Skeleton width="100%" height={50} />
          <Skeleton width="100%" height={50} />
        </Box>
      </Box>
    </Stack>
  );
};

export default ProfileSkeleton;
