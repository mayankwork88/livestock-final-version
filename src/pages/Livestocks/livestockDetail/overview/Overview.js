import React from "react";
import LivestockInfo from "./LivestockInfo";
import LivestockStatus from "./LivestockStatus";
import { Box, Stack } from "@mui/material";
import { chartCardData, statusCardData } from "../../Data";
import {
  ParameterCard,
  Skeleton,
  StatusCard,
  TabPane,
} from "../../../../ComponentsV2";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import useGetOverviewData from "./hooks/useGetOverviewData";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";
import toast from "react-hot-toast";

const Overview = () => {
  const { id } = useParams();
  const { formattedDate } = useDateFormat();
  const { isLoading, error, data } = useGetOverviewData(id);

  const getDate = (label) =>
    data?.[label] && data?.[label]?.toString()?.toUpperCase() !== "N/A"
      ? formattedDate(data?.[label])
      : "N/A";
  const isSafe = data?.liveStocklocationStatus?.toLowerCase() === "safe";

  const getParameterCardDate = (ele) => {
    if (ele) {
      return formattedDate(ele);
    } else {
      return "N/A";
    }
  };

  if (error) {
    toast.error(error.message);
  }

  const getLoader = (height) =>
    height ? (
      <Skeleton height={`${height}vh`} sx={{ background: "#F7F8FD" }} />
    ) : (
      <Skeleton width="100%" height={"100%"} sx={{ background: "#F7F8FD" }} />
    );

  return (
    <Stack
      direction={"row"}
      gap={2}
      justifyContent={"space-between"}
      sx={{ pt: 3 }}
    >
      <Stack width="80%" gap={isLoading ? 2 : 0}>
        {isLoading ? getLoader("30") : <LivestockInfo data={data} />}
        {isLoading ? getLoader("22") : <LivestockStatus data={data} />}
        {isLoading ? (
          getLoader("15")
        ) : (
          <Stack
            className="bg-light-gray radius-10"
            sx={{ width: { lg: "100%", md: "100%", sm: "100%" } }}
            px={2}
            pb={2}
          >
            <TypographyPrimary>Device status</TypographyPrimary>
            <Stack direction="row" gap={2} width="100%">
              {statusCardData?.map((card) => (
                <StatusCard
                  key={card.text}
                  text={card.text}
                  status={data?.[card.key] || "0"}
                  icon={card.icon}
                  statusColor={card.statusColor}
                  suffix={card.suffix}
                />
              ))}
            </Stack>
          </Stack>
        )}
      </Stack>
      <Stack
        sx={{
          width: { lg: "40%", md: "60%", sm: "80%" },
          flexDirection: { lg: "column", md: "column", sm: "row" },
          alignItems: { sm: "flex-start" },
          justifyContent: "space-between",
        }}
        gap={2}
      >
        {isLoading ? (
          getLoader()
        ) : (
          <Stack
            sx={{ width: { lg: "100%", md: "100%", sm: "100%" }, flexGrow: 1, height:'100%' }}
            className="bg-light-gray radius-10"
            px={2}
            pb={2}
            direction="column"
            gap={2}
          >
            <TabPane
              text="Status"
              secondaryText={`Last Update :  ${getDate(
                "livestockLocationStatusTime"
              )}`}
              btnText={data?.liveStocklocationStatus || "N/A"}
              hover={false}
              btnIcon={false}
              btnBgColor={isSafe ? "#47CD75" : "#FF5C33"}
              onBtnClick={() => {}}
            />
            <Box
              display="flex"
              flexDirection="column"
              sx={{
                flexGrow: 1,
                justifyContent: "space-between",
                gap:1
              }}
            >
              {chartCardData.map((ele) => (
                <Box sx={{ flexGrow: 0 }}>
                  <ParameterCard
                    label={ele.label}
                    value={data?.[`${ele.key}`] || 0}
                    icon={ele.icon}
                    colors={ele.colors}
                    valueColor={
                      data?.[`${ele.alertKey}`]
                        ? "err-color"
                        : "color-success--dark"
                    }
                    suffix={ele.suffix}
                    createdAt={getParameterCardDate(
                      data?.[`${ele.timeKey}`] || undefined
                    )}
                  />
                </Box>
              ))}
            </Box>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Overview;
