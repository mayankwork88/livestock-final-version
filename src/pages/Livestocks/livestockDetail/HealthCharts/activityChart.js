import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { activityLegends } from "../ChartSection/dataFormats";

function ActivityChart({
  height = 200,
  width,
  data,
}) {
  const colors = {
    steps: { stroke: "#4f46e5", fill: "#c7d2fe" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",    
  };
  const showInHour = Boolean(data?.length && "hour" in data?.[0]);
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length ? (showInHour ? "hour" : "day") : "hour";
  const xUnit = showInHour ? " hr" : "";
  const dataLabel = showInHour ? "activeTimeInMinutes" : "activeTimeInHours";
  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={getData}>
          <XAxis
            dataKey={xLabel}
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit={xUnit}
          />
          <YAxis
            domain={[0, Number(data?.[0]?.highThreshold) + 20]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit={data?.length ? (showInHour ? " min" : " hr") : " min"}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              color: colors.steps.stroke,
            }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(activityLegends)}
          />
          <Bar
            dataKey={dataLabel}
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="activity"
            barSize={30}
          />
          <ReferenceLine
            y={Number(data?.[0]?.highThreshold)}
            label="Max"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
          <ReferenceLine
            y={Number(data?.[0]?.lowThreshold)}
            label="Min"
            stroke="red"
            strokeWidth={1}
            strokeDasharray="10 20"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Stack>
  );
}

export default ActivityChart;
