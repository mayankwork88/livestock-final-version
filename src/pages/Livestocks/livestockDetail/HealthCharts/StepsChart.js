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
import { chartData, stepsFakeData, stepByDay } from "./chartData";
import { renderLegend } from "../ChartSection/legend";
import { stepsLegends } from "../ChartSection/dataFormats";

function StepsChart({ height = 200, width, data, thresholds, dayWise }) {
  const colors = {
    steps: {
      stroke: "rgba(255, 151, 119, 1)",
      fill: "rgba(255, 151, 119, 0.5)",
    },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };
  const getData = data?.length ? data : chartData;
  const xLabel = data?.length ? ("hour" in data?.[0] ? "hour" : "day") : "hour";
  const xUnit = data?.length ? ("hour" in data?.[0] ? " hr" : "") : " hr";

  return (
    <Stack sx={{ overflowX: "auto", overflowY: "hidden" }}>
      <ResponsiveContainer height={height} width={width}>
        <ComposedChart data={getData}>
          <XAxis
            dataKey={xLabel}
            tickSize={10}
            tickMargin={15}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
            height={47}
            unit={xUnit}
          />
          <YAxis
            domain={[0, Number(data?.[0]?.highThreshold) + 10]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip
            contentStyle={{ backgroundColor: colors.background, color: "#222" }}
            itemStyle={{ color: colors?.steps?.stroke }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            height={36}
            content={renderLegend(stepsLegends)}
          />
          <Bar
            dataKey="totalSteps"
            stroke={colors.steps.stroke}
            fill={colors.steps.fill}
            strokeWidth={2}
            name="Total Steps"
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

export default StepsChart;
