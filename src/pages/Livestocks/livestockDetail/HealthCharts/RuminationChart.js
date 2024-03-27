import {
  Area,
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
import { ruminationLegends } from "../ChartSection/dataFormats";

function RuminationChart({
  height = 200,
  width,
  data,
}) {
  const colors = {
    rumination: {
      stroke: "rgba(97, 169, 255, 1)",
      fill: "rgba(97, 169, 255, 0.5)",
    },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const showInHour = Boolean(data?.length && "hour" in data?.[0]);
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length ? (showInHour ? "hour" : "day") : "hour";
  const xUnit = showInHour ? " hr" : "";
  const dataLabel = showInHour ? "ruminationTimeInMinutes" : "ruminationTimeInHours";

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={getData}>
          {/* <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor={colors?.rumination?.fill}
                stopOpacity={1}
              />
              <stop
                offset="95%"
                stopColor={colors?.rumination?.fill}
                stopOpacity={0}
              />
            </linearGradient>
          </defs> */}
          <XAxis
            dataKey={xLabel}
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            height={47}
            unit={xUnit}
          />
          <YAxis
            domain={[0, Number(data?.[0]?.highThreshold) + 50]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            unit=" mins"
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(ruminationLegends)}
          />
          <Area
            dataKey={dataLabel}
            stroke={colors.rumination.stroke}
            fill="url(#colorUv)"
            strokeWidth={2}
            name="Rumination"
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

export default RuminationChart;
