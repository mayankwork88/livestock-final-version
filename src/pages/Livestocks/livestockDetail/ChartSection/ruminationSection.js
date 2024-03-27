import { Box, Stack } from "@mui/material";
import { useState, useEffect } from "react";
import {
  TableV2,
  ExportAsCSV,
  TabPaneV2,
  CustomPagination,
  NoData,
  Spinner,
  TableSkeleton,
} from "../../../../ComponentsV2";
import RuminationChart from "../HealthCharts/RuminationChart";
import HealthChartsModalContent from "../HealthCharts/HealthChartsModalContent";
import useGetColorDynamically from "../../../../hooks/useGetColorDynamically";
import useDateFormat from "../../../../hooks/useDateFormat";
import { TypographySecondary } from "../../../../ComponentsV2/themeComponents";
import { ruminationfake, ruminationDayWise } from "../HealthCharts/chartData";
import { useParams } from "react-router-dom";
import { useLivestockHealthContext } from "../../../../context/LivestockHealthContext";
import { roundOffUptoTwo } from "../../../../utils/utils";
import { exportFormat, getFormattedHealthLogsData } from "./dataFormats";

const tableHeadData = ["sensor name", "current value", "Date & Time"];

const RuminationSection = ({ thresholds }) => {
  const { id } = useParams();
  const {
    getLogs,
    healthLogData,
    handleLogsPaginationChange,
    logsDateRange,
    setLogsDateRange,
    chartDataLoader,
    getChartData,
    chartDateRange,
    setChartDateRange,
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
  }, [id, chartDateRange, activeTab]);

  return (
    <Stack width="100%" direction={"column"} gap={5}>
      <Stack width="100%">
        <HealthChartsModalContent
          label={"Rumination"}
          dateRange={true}
          total={`${chartData?.totalValue || 0}`}
          selectedDate={chartDateRange}
          setSelectedDate={setChartDateRange}
        >
          {chartDataLoader ? (
            <Stack height={500}>
              <Spinner />
            </Stack>
          ) : (
            <RuminationChart
              height={500}
              thresholds={thresholds}
              selectedDate={chartDateRange}
              data={chartData?.data || []}
            />
          )}
        </HealthChartsModalContent>
      </Stack>

      <Stack width="100%" direction={"column"} gap={3}>
        <Box>
          <TabPaneV2
            paneText="Rumination"
            paneTextColor="#000"
            datePicker={true}
            btnDisabled={!logsDataLength}
            btnText={
              logsDataLength ? (
                <ExportAsCSV
                  headers={tableHeadData?.map((ele) =>
                    ele === "Date & Time" ? "date" : ele
                  )}
                  data={exportFormat(logsData, "rumination", "activeTime", "")}
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
              tableHeadData={tableHeadData}
              tableRowData={getFormattedHealthLogsData(
                logsData,
                "activeTime",
                "",
                "rumination"
              )?.map((ele) => {
                delete ele?.highThreshold;
                delete ele?.lowThreshold;
                return ele;
              })}
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

export default RuminationSection;
