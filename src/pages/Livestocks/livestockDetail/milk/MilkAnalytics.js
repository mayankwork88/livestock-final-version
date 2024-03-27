import { Box, Paper, Stack, Typography } from "@mui/material";
import React, { useState, useRef } from "react";
import {
  CustomModal,
  ParameterCard,
  Skeleton,
  TabPane,
} from "../../../../ComponentsV2";
import useGetMilkAnalyticsData from "./hooks/useGetMilkAnalyticsData";
import { milkAnalyticsCardData } from "./Data";
import MilkAnalyticsChart from "./MilkAnalyticsChart";
import generatePDF from "react-to-pdf";
import { useParams } from "react-router-dom";
import useDateFormat from "../../../../hooks/useDateFormat";
import { ordinalNumber } from "../../../../Role/Admin/UserManagemnet/utils/utils";
import PDFPreview from "./PDFPreview";
import MilkAnalyticsContent from "./MilkAnalyticsContent";
import { is } from "date-fns/locale";

const MilkAnalytics = () => {
  const { id } = useParams();
  const { paginationDateFormat } = useDateFormat();
  const [pdfLoading, setPDFLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [eleRef, useEleRef] = useState(null);
  const [lactationValue, setLactationValue] = useState("1");
  const { isLoading, error, data } = useGetMilkAnalyticsData(
    id,
    lactationValue
  );

  const handlePDFDownload = () => {
    setPDFLoading(true);
    setTimeout(() => {
      generatePDF(
        { current: eleRef },
        { filename: "livestock_milk_analytics.pdf" }
      ).then((data) => {
        if (data) {
          setPDFLoading(false);
        }
      });
    }, 1000);
  };

  return (
    <Stack width="100%">
      <Box width={"100%"}>
        <TabPane
          text={"milk production analytics"}
          minWidth="10rem"
          hover={true}
          selectValue={
            data?.overviewData?.interCalvingDataLength ? lactationValue : false
          }
          selectOptions={Array.from(
            { length: Number(data?.overviewData?.interCalvingDataLength) },
            (_, ind) => {
              return {
                label: `${ordinalNumber(ind + 1)} Lactation`,
                value: ind + 1,
              };
            }
          )}
          onSelectChange={(value) => setLactationValue(value)}
          loading={pdfLoading}
          btnText="export"
          onBtnClick={() => setShowPreview(true)}
        />
      </Box>
      {/* <Stack ref={useEleRef}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          sx={{ py: 2, gap: { lg: 2, md: 2, sm: 1 } }}
        >
          {isLoading ? (
            <>
              <Skeleton width={"24%"} height={"10vh"} />
              <Skeleton width={"24%"} height={"10vh"} />
              <Skeleton width={"24%"} height={"10vh"} />
              <Skeleton width={"24%"} height={"10vh"} />
            </>
          ) : (
            milkAnalyticsCardData?.map((ele) => (
              <ParameterCard
                label={ele.label}
                value={data?.overviewData?.[ele?.key]}
                icon={ele.icon}
                colors={ele.colors}
                suffix={""}
              />
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
      </Stack> */}
      <MilkAnalyticsContent data={data} isLoading={isLoading} />
      <CustomModal
        content={<PDFPreview data={data} isLoading={isLoading}/>}
        openModal={showPreview}
        customWidth={'70%'}
        handleClose={() => setShowPreview(false)}
      />
    </Stack>
  );
};

export default MilkAnalytics;
