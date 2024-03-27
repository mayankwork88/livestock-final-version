import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Line,
  Legend,
} from "recharts";
import { Stack } from "@mui/material";
import { renderLegend } from "../ChartSection/legend";
import { tempLegends } from "../ChartSection/dataFormats";
import { useTheme } from "@emotion/react";

function MilkAnalyticsChart({ height = 200, data, width }) {
  const theme = useTheme();
  const colors = {
    analytics: {
      stroke: theme.palette.primary.main,
      fill: theme.palette.primary.main,
    },
    threshold: { stroke: "#16a34a", fill: "#dcfce7" },
    text: "#374151",
    background: "#fff",
  };

  return (
    <ResponsiveContainer height={height} width={'100%'}>
        <ComposedChart data={data}>
          <XAxis
            dataKey={"label"}
            tickSize={10}
            tickMargin={10}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            // unit=" °F"
            //   domain={[0, Number(thresholds?.high) + 5]}
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          {/* <Legend
              align="left"
              verticalAlign="top"
              height={36}
              content={renderLegend(tempLegends)}
            /> */}
          <Line
            dataKey="entryQuantity"
            stroke={colors.analytics.stroke}
            fill={colors.analytics.fill}
            strokeWidth={2}
            name="Quantity"
            //   unit=" °F"
          />
        </ComposedChart>
      </ResponsiveContainer>
  );
}

export default MilkAnalyticsChart;
