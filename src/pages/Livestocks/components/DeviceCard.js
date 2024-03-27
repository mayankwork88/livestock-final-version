import React from "react";
import { Stack, Box, Divider } from "@mui/material";
import { Spinner, TabPane } from "../../../ComponentsV2";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useTheme } from "@emotion/react";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useDateFormat from "../../../hooks/useDateFormat";

const DeviceCard = ({
  label,
  data,
  onRemove,
  deviceDataFormat,
  loading,
  handleQRClick,
}) => {
  const { formattedDate } = useDateFormat();
  const { getCamelCase } = useGetCamelCase();
  const theme = useTheme();
  return (
    <Stack
      sx={{ width: { lg: "40%", md: "100%", sm: "100%" } }}
      my={4}
      direction="row"
      alignItems="flex-start"
      gap={4}
    >
      <Stack
        width="100%"
        sx={{ border: "1px solid #dddddd", borderRadius: "10px" }}
      >
        <Box p="10px 20px">
          <TabPane
            loading={loading}
            text={`${label} Info`}
            btnText="remove"
            btnIcon={
              loading ? (
                <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
              ) : null
            }
            hover={true}
            btnBgColor="#FF0505"
            onBtnClick={onRemove}
            showQR={true}
            handleQRClick={handleQRClick}
          />
        </Box>
        <Divider />
        <Stack px="20px">
          <Box display="flex" justifyContent="flex-start">
            <TypographyPrimary
              sx={{
                color: "#B5B5C3",
                minWidth: "40%",
                display: "flex",
                justifyContent: "space-between",
                pr: 5,
              }}
            >
              Status
              <Box component="span">:</Box>
            </TypographyPrimary>
            <TypographyPrimary
              sx={{
                color: data?.status
                  ? theme.palette.success.light
                  : theme.palette.error.light,
              }}
            >
              {data?.status ? "Online" : "Offline"}
            </TypographyPrimary>
          </Box>
          {deviceDataFormat
            ?.map((ele) => {
              return {
                ...ele,
                value: data
                  ? ele?.label?.toLowerCase()?.includes("battery")
                    ? `${data[getCamelCase(ele.label)]}%`
                    : data[getCamelCase(ele.label)]
                  : "N/A",
              };
            })
            ?.map((ele) => (
              <Box display="flex" justifyContent="flex-start">
                <TypographyPrimary
                  sx={{
                    color: "#B5B5C3",
                    minWidth: "40%",
                    display: "flex",
                    justifyContent: "space-between",
                    pr: 5,
                  }}
                >
                  {ele.label}
                  <Box component="span">:</Box>
                </TypographyPrimary>
                <TypographyPrimary sx={{ color: "#222222" }}>
                  {ele?.label?.toLowerCase()?.includes("added")
                    ? formattedDate(ele.value)
                    : ele?.value}
                </TypographyPrimary>
              </Box>
            ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default DeviceCard;
