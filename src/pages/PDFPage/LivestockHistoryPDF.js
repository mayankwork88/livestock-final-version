import axios from "axios";
import generatePDF from "react-to-pdf";
import { useEffect, useState } from "react";
import { Box, Button, InputAdornment, Stack, TextField } from "@mui/material";
import { format, subBusinessDays } from "date-fns";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";
import TemperatureChart from "../Livestocks/livestockDetail/HealthCharts/TemperatureChart";
import { CalendarMonthIcon } from "../../icons";
import HeartBeatChart from "../Livestocks/livestockDetail/HealthCharts/HeartbeatChart";
import StepsChart from "../Livestocks/livestockDetail/HealthCharts/StepsChart";
import ActivityChart from "../Livestocks/livestockDetail/HealthCharts/activityChart";
import useDateFormat from "../../hooks/useDateFormat";
import CircularProgress from "@mui/material/CircularProgress";
import { useParams } from "react-router-dom";

const ShowPdfFormat = ({ setRef, data, date }) => {
  const { formattedDate } = useDateFormat();
  const formattedData = (data) => {
    return data?.map((ele) => ({
      ...ele,
      createdAt: formattedDate(ele?.createdAt, "time"),
    }));
  };

  const getLabel = (label) => {
    return (
      <TypographyPrimary
        sx={{
          fontSize: "14px",
          m: 0,
          color: "rgba(0,0,0,0.6)",
          textAlign: "center",
        }}
      >
        {label}
      </TypographyPrimary>
    );
  };

  const getValue = (value) => {
    return (
      <TypographyPrimary
        sx={{ fontSize: "16px", m: 0, color: "rgba(0,0,0,0.9)" }}
      >
        {value}
      </TypographyPrimary>
    );
  };

  const getHeading = (heading, low, avg, high) => {
    return (
      <Stack direction={"row"} justifyContent={"space-between"}>
        <TypographyPrimary
          sx={{ fontSize: "18px", m: 0, color: "rgba(0,0,0,0.6)" }}
        >
          {heading} Overview
        </TypographyPrimary>
        <Stack direction={"row"} gap={2}>
          <Box>
            {getLabel("Low")}
            {getValue(low)}
          </Box>
          <Box>
            {getLabel("Avg")}
            {getValue(avg)}
          </Box>
          <Box>
            {getLabel("High")}
            {getValue(high)}
          </Box>
        </Stack>
      </Stack>
    );
  };

  const roundOffUpto2 = (key) => {
    const num = data?.minMaxAvgValue[key];
    const res = Math.round((num + Number.EPSILON) * 100) / 100;
    return res;
  };
  return (
    <Stack ref={setRef} m={4} my={2} p={4} sx={{ width: "2060px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Box display={"flex"} gap={1}>
          <TypographyPrimary sx={{ fontSize: "21px", m: 0 }}>
            Livestock Name :{data?.livestockData?.name || "N/A"}
          </TypographyPrimary>
          <TypographyPrimary sx={{ fontSize: "21px", m: 0 }}>
            UID :{data?.livestockData?.uID || "N/A"}
          </TypographyPrimary>
        </Box>
        <TextField
          size="small"
          sx={{ width: "250px" }}
          value={`${date?.startDate} - ${date?.endDate}`}
          placeholder="MM/DD/YYYY"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "4px",
          my: 2,
          p: 2,
        }}
      >
        {getHeading(
          "Temperature",
          `${roundOffUpto2("minTemperature") || 0} °F`,
          `${roundOffUpto2("avgTemperature") || 0} °F`,
          `${roundOffUpto2("maxTemperature") || 0} °F`
        )}
        <TemperatureChart
          thresholds={data?.livestockData?.threshold?.temperature}
          data={formattedData(data?.temperatureData) || []}
          height={480}
        />
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "4px",
          my: 2,
          p: 2,
        }}
      >
        {getHeading(
          "Heartbeat",
          `${roundOffUpto2("minHeartBeat") || 0} Bpm`,
          `${roundOffUpto2("avgHeartBeat") || 0} Bpm`,
          `${roundOffUpto2("maxHeartBeat") || 0} Bpm`
        )}
        <HeartBeatChart
          thresholds={data?.livestockData?.threshold?.heartBeat}
          data={formattedData(data?.heartBeatData) || []}
          height={480}
        />
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "4px",
          my: 2,
          p: 2,
        }}
      >
        {getHeading(
          "Steps",
          `${roundOffUpto2("minSteps") || 0}`,
          `${roundOffUpto2("avgSteps") || 0}`,
          `${roundOffUpto2("maxSteps") || 0}`
        )}
        <StepsChart
          thresholds={data?.livestockData?.threshold?.steps}
          data={data?.stepsData || []}
          height={480}
        />
      </Stack>
      <Stack
        direction={"column"}
        gap={2}
        sx={{
          border: "1px solid rgba(0,0,0,0.3)",
          borderRadius: "4px",
          my: 2,
          p: 2,
        }}
      >
        {getHeading(
          "Activity",
          `${roundOffUpto2("minActiveTime") || 0} hr`,
          `${roundOffUpto2("avgActiveTime") || 0} hr`,
          `${roundOffUpto2("maxActiveTime") || 0} hr`
        )}
        <ActivityChart
          thresholds={data?.livestockData?.threshold?.activity || {}}
          data={data?.activityData || []}
          height={480}
        />
      </Stack>
    </Stack>
  );
};

const LivestockHistoryPDF = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [eleRef, useEleRef] = useState(null);
  const { id } = useParams();
  const startDate = format(subBusinessDays(new Date(), 6), "yyyy-MM-dd");
  const endDate = format(new Date(), "yyyy-MM-dd");

  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `http://localhost:8085/api/v1/liveStock/getLivestockData?startDate=${startDate}&endDate=${endDate}&macID=${id}`
      )
      .then((res) => {
        if (res.status === 200) {
          setData(res?.data.data);
        } else {
          setData(null);
        }
      })
      .catch((err) => {
        console.log(err, "jgbjbngjnbjgnj");
      })
      .finally(() => setLoading(false));
  }, []);

  // useEffect(() => {
  //   if (data && eleRef && !loading) {
  //     setTimeout(() => {
  //       generatePDF(
  //         { current: eleRef },
  //         {
  //           filename: "livestock_medical_history.pdf",
  //         }
  //       );
  //     }, 2000);
  //   }
  // }, [data, eleRef, loading]);

  if (loading) {
    return (
      <Stack direction={"row"} justifyContent={"center"} sx={{ p: 2 }}>
        <CircularProgress />
      </Stack>
    );
  }

  const handleDownload = () => {
    setBtnLoading(true);
    generatePDF(
      { current: eleRef },
      { filename: "livestock_medical_history.pdf" }
    ).then((data) => {
      if (data) {
        setBtnLoading(false);
      }
    });
  };
  return (
    <div
      style={{
        height: "100vh",
        overflow: "hidden",
        // border: "1px solid red",
      }}
    >
      <Stack
        sx={{
          position: "fixed",
          inset: "0",
          p: "10px",
          background: "#fff",
          m: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          disabled={btnLoading}
          startIcon={
            btnLoading ? (
              <CircularProgress size={20} sx={{ color: "#fff" }} />
            ) : null
          }
          variant="contained"
          sx={{ fontSize: "21px" }}
          onClick={handleDownload}
        >
          Download PDF
        </Button>
      </Stack>
      <ShowPdfFormat
        setRef={useEleRef}
        data={data}
        date={{ startDate, endDate }}
      />
    </div>
  );
};

export default LivestockHistoryPDF;
