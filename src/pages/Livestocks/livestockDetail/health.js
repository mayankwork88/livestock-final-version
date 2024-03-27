import { Stack } from "@mui/material";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../../ComponentsV2/themeComponents";
import { useState, useEffect } from "react";
import {
  ChartCard,
  BtnGroup,
  Skeleton,
  CustomModal,
} from "../../../ComponentsV2";
import useDateFormat from "../../../hooks/useDateFormat";
import { chartCardData } from "../Data";
import TemperatureSection from "./ChartSection/temperatureSection";
import HeartbeatSection from "./ChartSection/heartbeatSection";
import StepsSection from "./ChartSection/stepsSection";
import ActivitySection from "./ChartSection/activitySection";
import RuminationSection from "./ChartSection/ruminationSection";
import { useLivestockHealthContext } from "../../../context/LivestockHealthContext";
import { useParams } from "react-router-dom";
import ShowQRModalContent from "../../PDFPage/ShowQRModalContent";

const btnData = [
  {
    label: "temperature",
  },
  {
    label: "heartbeat",
  },
  {
    label: "steps counter",
  },
  {
    label: "activity tracker",
  },
  {
    label: "rumination",
  },
];

const ShowLivestockQR = ({ collarId }) => {
  return (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      pb={2}
    >
      <TypographyPrimary
        sx={{
          mb: 0.3,
          px: 1,
          fontSize: "2.1rem",
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        Scan QR to download livestock historical data
      </TypographyPrimary>
      <ShowQRModalContent id={collarId} title="" />
      <TypographyPrimary
        sx={{
          px: 1,
          my: 0.5,
          mb: 1,
          fontSize: "2.1rem",
          textTransform: "capitalize",
          textAlign: "center",
        }}
      >
        OR
      </TypographyPrimary>
      <ButtonPrimary
        sx={{
          p: 1,
          textTransform: "uppercase",
          letterSpacing: "2px",
          display: "flex",
          justifyContent: "center",
          minWidth: "150px",
          m: 0,
        }}
      >
        <a
          target="_blank"
          style={{ color: "#fff", textDecoration: "none" }}
          href={`${window.location.origin}/getLivestockHistory/${collarId}`}
        >
          Click here
        </a>
      </ButtonPrimary>
    </Stack>
  );
};

const Health = ({ data }) => {
  const [showHealthTab, setShowHealthTab] = useState("temperature");
  const [showRefreshButton, setShowRefreshButton] = useState(false);
  const [modal, setModal] = useState(false);
  const { id } = useParams();
  const { formattedDate } = useDateFormat();
  const {
    setActiveTab,
    getHealthCardData,
    healthCardData,
    handleRefreshButton,
    healthDataLoading,
  } = useLivestockHealthContext();
  const { cardData, threshold } = healthCardData;

  useEffect(() => {
    getHealthCardData(id);
    // const interval = setInterval(() => {
    //   getHealthCardData(id);
    //   getChartData(id);
    //   getLogs(id);
    // }, 60000);
    // return () => clearInterval(interval);
  }, [id]);

  const showSection = (key) => {
    const { heartBeat, rumination, temperature, steps, activity } = threshold;
    if (key === "temperature") {
      return <TemperatureSection thresholds={temperature} />;
    } else if (key === "heartbeat") {
      return <HeartbeatSection thresholds={heartBeat} />;
    } else if (key === "steps counter") {
      return <StepsSection thresholds={steps} />;
    } else if (key === "activity tracker") {
      return <ActivitySection thresholds={activity} />;
    } else if (key === "rumination") {
      return <RuminationSection thresholds={rumination} />;
    } else {
      return <TemperatureSection thresholds={temperature} />;
    }
  };

  const handleActiveTab = (key) => {
    setShowHealthTab(key);
    if (key === "temperature") {
      setActiveTab(1);
    } else if (key === "heartbeat") {
      setActiveTab(2);
    } else if (key === "steps counter") {
      setActiveTab(3);
    } else if (key === "activity tracker") {
      setActiveTab(4);
    } else if (key === "rumination") {
      setActiveTab(5);
    } else {
      setActiveTab(1);
    }
  };

  const isActivity = (ele) => ele?.label?.toLowerCase() === "activity";
  const isHour = (ele) => Number(cardData?.[ele?.label + "Hour"]) > 1;

  const handleDisableButton = () => {
    setShowRefreshButton(true);
    setTimeout(() => {
      setShowRefreshButton(false);
    }, 30000);
  };

  const handleRefresh = () => {
    handleDisableButton();
    handleRefreshButton(id);
  };


  const getParameterCardDate = (ele) => {
    if (ele) {
      return formattedDate(ele);
    } else {
      return "N/A";
    }
  };
  return (
    <Stack mt={4} direction="column" alignItems="center" gap={4}>
      <Stack
        width="100%"
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <TypographyPrimary sx={{ fontSize: "21px", m: 0 }}>
          Showing Health Data
        </TypographyPrimary>
        <Stack direction="row" gap={2}>
          <ButtonPrimary
            disabled={showRefreshButton}
            variant="contained"
            sx={{ p: "5px 15px" }}
            onClick={handleRefresh}
          >
            Refresh
          </ButtonPrimary>
          <ButtonPrimary
            variant="contained"
            sx={{ p: "5px 15px" }}
            onClick={() => setModal(true)}
          >
            Export Historical Data
          </ButtonPrimary>
        </Stack>
      </Stack>
      <Stack
        width="100%"
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        gap={2}
      >
        {chartCardData?.map((ele) =>
          healthDataLoading ? (
            <Skeleton
              height={"121px"}
              sx={{ minWidth: "230px", flexGrow: 1 }}
            />
          ) : (
            <ChartCard
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
          )
        )}
      </Stack>
      <BtnGroup
        btnData={btnData}
        activeBtn={showHealthTab}
        onChange={(ele) => handleActiveTab(ele)}
      />
      {showSection(showHealthTab)}
      <CustomModal
        content={
          <ShowLivestockQR
            collarId={data?.collar?.macID || data?.pedometer?.macID}
          />
        }
        customWidth="25%"
        customWidthMd="40%"
        customWidthSm="50%"
        // customWidth="45%"
        // customWidthMd="70%"
        // customWidthSm="90%"
        openModal={modal}
        handleClose={() => setModal(false)}
      />
    </Stack>
  );
};

export default Health;
