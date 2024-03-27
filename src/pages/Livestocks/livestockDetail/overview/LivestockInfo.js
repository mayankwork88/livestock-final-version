import { Box, Stack } from "@mui/material";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import { LivestockCoverPhoto } from "../../../../assets";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { getCapitalize } from "../../../../Role/Admin/UserManagemnet/utils/utils";

const LivestockInfo = ({ data }) => {
  const getImgUrl = (str) => {
    if (str?.toString()?.length) {
      const img = str?.toString()?.split("://");
      return "http://" + img[1];
    }
  };
  return (
    <Stack
      width="100%"
      sx={{ background: "#F7F8FD", p: 2, pt: 0, borderRadius: "10px" }}
    >
      <TypographyPrimary>Livestock Information</TypographyPrimary>
      <Stack direction={"row"} width="100%">
        <Stack width="40%">
          <img
            style={{
              maxHeight:'200px',
              height: "100%",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={
              data?.imgPath || getImgUrl(data?.imgPath) || LivestockCoverPhoto
            }
            alt="livestock image"
          />
        </Stack>
        <Stack
          width="60%"
          px={2}
          py={0.5}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Livestock UID"}
              value={getCapitalize(data?.uID)}
            />
            <CustomTextField
              disabled={true}
              label={"Livestock name"}
              value={getCapitalize(data?.name)}
            />
          </Box>
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Age"}
              value={data?.age || "N/A"}
            />
            <CustomTextField
              disabled={true}
              label={"Breed"}
              value={getCapitalize(data?.breed)}
            />
          </Box>
          <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
            <CustomTextField
              disabled={true}
              label={"Gender"}
              value={getCapitalize(data?.gender)}
            />
            <CustomTextField
              disabled={true}
              label={"Color"}
              value={getCapitalize(data?.color)}
            />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LivestockInfo;
