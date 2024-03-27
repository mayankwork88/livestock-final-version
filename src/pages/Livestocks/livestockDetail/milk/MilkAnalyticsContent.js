import { Box, Paper, Stack,  } from "@mui/material";
import {
  ParameterCard,
  Skeleton,
} from "../../../../ComponentsV2";
import { milkAnalyticsCardData } from "./Data";
import MilkAnalyticsChart from "./MilkAnalyticsChart";
import useDateFormat from "../../../../hooks/useDateFormat";

const MilkAnalyticsContent = ({ data, isLoading }) => {
  const { paginationDateFormat } = useDateFormat();

  const getPreviousDate = (days) => {
    const currentDate = new Date();
    const nextDate = new Date(currentDate);
    return nextDate.setDate(currentDate.getDate() - days);
  };

  const chartDummyData = () => {
    const data = Array.from({ length: 7 }, (_, ind) => ({
      label: paginationDateFormat(getPreviousDate(ind)),
      entryQuantity: 0,
    }));

    return data?.toReversed();
  };

  return (
    <Stack>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        sx={{ py: 2, gap: { lg: 2, md: 2, sm: 1 } }}
      >
        {isLoading ? (
          <>
           <Skeleton
              height={"95px"}
              sx={{ minWidth: "213px", flexGrow: 1 }}
            />
            <Skeleton
              height={"95px"}
              sx={{ minWidth: "251px", flexGrow: 1 }}
            />
            <Skeleton
              height={"95px"}
              sx={{ minWidth: "244px", flexGrow: 1 }}
            />
            <Skeleton
              height={"95px"}
              sx={{ minWidth: "224px", flexGrow: 1 }}
            />
          </>
        ) : (
          milkAnalyticsCardData?.map((ele) => (
            <Box sx={{width:{xs:'48.5%', sm:'48.5%',md:'48.5%', lg:"auto"}, flexGrow:1}}>
              <ParameterCard
              label={ele.label}
              value={data?.overviewData?.[ele?.key]}
              icon={ele.icon}
              colors={ele.colors}
              suffix={""}
            />
            </Box>
          ))
        )}
      </Stack>
      {isLoading ? (
        <Skeleton width={"100%"} height={"40vh"} />
      ) : (
        <Paper
          sx={{ border: "1px solid rgba(0,0,0,0.1)", pt: 5, pb: 3, pr: 5 }}
        >
          <MilkAnalyticsChart
            height={400}
            data={data?.data?.length ? data?.data : chartDummyData()}
          />
        </Paper>
      )}
    </Stack>
  );
};

export default MilkAnalyticsContent;
