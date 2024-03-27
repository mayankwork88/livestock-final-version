import { Box, Stack } from "@mui/material";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import useDateFormat from "../../../../hooks/useDateFormat";

const LivestockStatus = ({ data }) => {
  const { formattedDate } = useDateFormat();

  const getDate = (label) => {
    if (data?.[label]?.toLowerCase() === "n/a" || !data?.[label]) return "N/A";
    return data?.[label] ? formattedDate(data?.[label], "date") : "N/A";
  };
  return (
    <Stack
      width="100%"
      sx={{ background: "#F7F8FD", p: 2, pt: 0, my: 2, borderRadius: "10px" }}
    >
      <TypographyPrimary>Live Status</TypographyPrimary>
      <Stack
        width="100%"
        px={2}
        py={0.5}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Box display={"flex"} sx={{ display: "flex", gap: 3 }}>
          <CustomTextField
            disabled={true}
            label={"Parity"}
            value={data?.parity || "N/A"}
          />
          {console.log(data, "cfjvbfbvnfjnvjnfjnvjf")}
          <CustomTextField
            disabled={true}
            label={"Last calving date"}
            value={getDate("lastCalvingDate")}
          />
          <CustomTextField
            disabled={true}
            label={"Lactation day"}
            value={data?.lactationDay || "N/A"}
          />
        </Box>
        <Box display={"flex"} sx={{ display: "flex", gap: 2 }}>
          <CustomTextField
            disabled={true}
            label={"Last AI date"}
            value={getDate("lastSuccessAiDate")}
          />
          <CustomTextField
            disabled={true}
            label={"Gestation day"}
            value={data?.gestationPeriod || "N/A"}
          />
          <CustomTextField
            disabled={true}
            label={"Expected calving date"}
            value={getDate("expectedCalvingDate")}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default LivestockStatus;
