import { Box, Stack } from "@mui/material";
import { useEffect } from "react";
import {
  TableV2,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
  Spinner,
  TableSkeleton,
} from "../../../../ComponentsV2";
import HeartBeatChart from "../HealthCharts/HeartbeatChart";
import HealthChartsModalContent from "../HealthCharts/HealthChartsModalContent";
import { TypographySecondary } from "../../../../ComponentsV2/themeComponents";
import { useLivestockHealthContext } from "../../../../context/LivestockHealthContext";
import { useParams } from "react-router-dom";
import {
  getFormattedHealthLogsData,
  exportFormatV2,
  logsTableHeaders,
} from "./dataFormats";

const HeartbeatSection = ({ thresholds }) => {
  const { id } = useParams();
  const {
    getLogs,
    healthLogData,
    handleLogsPaginationChange,
    logsDateRange,
    setLogsDateRange,
    chartDataLoader,
    getChartData,
    singleSelectedDate,
    setSingleSelectedDate,
    activeTab,
    healthChartData: chartData,
  } = useLivestockHealthContext();
  //DESTRUCTING LOGS DATA
  const { logsData, logsDataLength, pagination, loading } = healthLogData;

  useEffect(() => {
    getLogs(id);
  }, [pagination, logsDateRange, activeTab]);

  useEffect(() => {
    getChartData(id);
  }, [id, singleSelectedDate, activeTab]);

  return (
    <Stack width="100%" direction={"column"} gap={5}>
      <Stack width="100%">
        <HealthChartsModalContent
          selectedDate={singleSelectedDate}
          label={"Heartbeat"}
          setSelectedDate={setSingleSelectedDate}
        >
          {chartDataLoader ? (
            <Stack height={500}>
              <Spinner />
            </Stack>
          ) : (
            <HeartBeatChart
              data={chartData?.data || []}
              height={500}
              thresholds={thresholds}
            />
          )}
        </HealthChartsModalContent>
      </Stack>
      <Stack width="100%" direction={"column"} gap={3}>
        <Box>
          <TabPaneV2
            paneText="heartbeat"
            paneTextColor="#000"
            datePicker={true}
            btnDisabled={logsDataLength ? false : true}
            btnText={
              logsDataLength ? (
                <ExportAsCSV
                  headers={logsTableHeaders?.map((ele) =>
                    ele === "Date & Time" ? "date" : ele
                  )}
                  data={exportFormatV2(logsData, "heartbeat", "heartBeat", "bpm")}
                  fileName="logs"
                >
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={() => {}}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={logsDateRange}
            setSelectedDate={setLogsDateRange}
          />
          <TypographySecondary sx={{ fontSize: "16px" }}>{`showing ${
            logsDataLength < 10 ? logsDataLength : 10
          } out of ${logsDataLength} Logs`}</TypographySecondary>
        </Box>
        {loading ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(3).fill("33%")}
          />
        ) : logsDataLength ? (
          <Box>
            <TableV2
              btnColor="#fff"
              btnBg="#B58B5D"
              tableHeadData={logsTableHeaders}
              tableRowData={getFormattedHealthLogsData(
                logsData,
                "heartBeat",
                " Bpm"
              )}
            />
            {logsDataLength > 10 ? (
              <Stack direction="row" justifyContent="center" pt={3}>
                <CustomPagination
                  size="large"
                  count={Math.ceil(logsDataLength / 10)}
                  page={pagination}
                  onPageChange={handleLogsPaginationChange}
                />
              </Stack>
            ) : null}
          </Box>
        ) : (
          <NoData />
        )}
      </Stack>
    </Stack>
  );
};

export default HeartbeatSection;
