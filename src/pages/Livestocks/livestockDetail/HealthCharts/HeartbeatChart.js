import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  ReferenceLine,
  Legend,
} from "recharts";
import { Stack } from "@mui/material";
import { chartData } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { heartbeatLegends } from "../ChartSection/dataFormats";

function HeartBeatChart({ height = 200, data, width, thresholds }) {
  const colors = {
    heartbeat: { stroke: "#FD3730", fill: "#FD3730" },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel =
    data?.length && "createdAt" in data?.[0] ? "createdAt" : "hour";

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
          />
          <YAxis
            unit=" Bpm"
            domain={[0, Number(data?.[0]?.highThreshold) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(heartbeatLegends)}
          />
          <Line
            dataKey="heartBeat"
            stroke={colors.heartbeat.stroke}
            fill={colors.heartbeat.fill}
            strokeWidth={2}
            name="Heartbeat"
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

export default HeartBeatChart;
