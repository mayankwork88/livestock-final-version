import { useEffect } from "react";
import { Stack, Box } from "@mui/material";
import LivestockInfo from "../../Collars/viewCollarDetails/livestockInfo";
import {
  TabPane,
  ParameterCard,
  StatusCard,
  Skeleton,
} from "../../../ComponentsV2";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { statusCardData, chartCardData } from "../Data";
import { useLivestockHealthContext } from "../../../context/LivestockHealthContext";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../hooks/useDateFormat";
import useLivestockContext from "../../../hooks/useLivestockContext";

const Overview = ({ data, setLivestockEditLoading }) => {
  const { formattedDate } = useDateFormat();
  const { openBackdropLoader } = useLivestockContext();
  const { id } = useParams();
  const { healthCardData, getHealthCardData } = useLivestockHealthContext();
  const { cardData } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
  }, [id]);

  const isActivity = (ele) => ele?.label?.toLowerCase() === "activity";
  const isHour = (ele) => Number(cardData?.[ele?.label + "Hour"]) > 1;

  const getCardValue = (ele) => {
    return isActivity(ele)
      ? isHour(ele)
        ? cardData?.[ele?.label + "Hour"]?.toString()?.slice(0, 2)
        : cardData?.[ele?.label + "Min"]?.toString()?.slice(0, 2)
      : cardData?.[ele?.label];
  };

  const getAlertStatus = (ele) => {
    const status = cardData?.[ele?.label?.toLowerCase() + "AlertStatus"];
    return status === false ? "color-success--dark" : "err-color";
  };

  const getParameterCardDate = (ele) => {
    if (ele) {
      return formattedDate(ele);
    } else {
      return "N/A";
    }
  };

  return (
    <Stack>
      <Stack
        mt={4}
        sx={{
          flexDirection: { lg: "row", md: "row" },
          paddingBottom: { sm: 4 },
        }}
        gap={4}
      >
        <Stack
          direction={"column"}
          gap={2}
          sx={{ width: { lg: "60%", md: "60%", sm: "100%" } }}
        >
          {openBackdropLoader ? (
            <Skeleton
              width="45.5vw"
              height="63vh"
              sx={{ background: "#F7F8FD" }}
            />
          ) : (
            <LivestockInfo
              data={data}
              setLivestockEditLoading={setLivestockEditLoading}
              handelLivestockRemove={() => {}}
              btnBgColor="#86633E"
              onBtnClick={null}
            />
          )}
          {openBackdropLoader ? (
            <Skeleton
              width="45.5vw"
              height="15vh"
              sx={{ background: "#F7F8FD" }}
            />
          ) : (
            <Stack
              className="bg-light-gray radius-10"
              sx={{ width: { lg: "100%", md: "100%", sm: "100%" } }}
              px={2}
              pb={2}
            >
              <TypographyPrimary>Device status</TypographyPrimary>
              <Stack direction="row" gap={2} width="100%">
                {statusCardData
                  ?.map((ele) => {
                    const label = ele?.text?.toString()?.split(" ");
                    const device = label[0]?.toLowerCase();
                    const battery = label[1]?.toLowerCase() + "Percent";
                    return {
                      ...ele,
                      status: data ? `${data?.[device]?.[battery]}` : "",
                    };
                  })
                  ?.map((card) => (
                    <StatusCard
                      key={card.text}
                      text={card.text}
                      status={card.status}
                      icon={card.icon}
                      statusColor={card.statusColor}
                      suffix={card.suffix}
                    />
                  ))}
              </Stack>
            </Stack>
          )}
        </Stack>
        {openBackdropLoader ? (
          <Skeleton width="31vw" height="78vh" sx={{ background: "#F7F8FD" }} />
        ) : (
          <Stack
            sx={{
              width: { lg: "40%", md: "40%", sm: "100%" },
              flexDirection: { lg: "column", md: "column", sm: "row" },
              alignItems: { sm: "flex-start" },
              justifyContent: "space-between",
            }}
            gap={2}
          >
            <Stack
              sx={{ width: { lg: "100%", md: "100%", sm: "100%" } }}
              className="bg-light-gray radius-10"
              px={2}
              pb={2}
              direction="column"
              gap={2}
            >
              <TabPane
                text="Status"
                secondaryText={`Last Update : ${
                  cardData?.livestockLocationStatusTime
                    ? formattedDate(cardData?.livestockLocationStatusTime)
                    : "N/A"
                }`}
                btnText={cardData?.liveStocklocationStatus || "N/A"}
                hover={false}
                btnIcon={false}
                btnBgColor={
                  cardData?.liveStocklocationStatus?.toLowerCase() === "safe"
                    ? "#47CD75"
                    : "#FF5C33"
                }
                onBtnClick={() => {}}
              />
              <Box display="flex" flexDirection="column" gap={2.7}>
                {chartCardData?.map((ele) => (
                  <ParameterCard
                    label={ele.label}
                    value={cardData?.[`${ele.key}`] || 0}
                    icon={ele.icon}
                    colors={ele.colors}
                    valueColor={
                      cardData?.[`${ele.alertKey}`]
                        ? "err-color"
                        : "color-success--dark"
                    }
                    suffix={ele.suffix}
                    createdAt={getParameterCardDate(
                      cardData?.[`${ele.timeKey}`] || undefined
                    )}
                  />
                ))}
              </Box>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default Overview;
