import React, {useState} from "react";
import { Stack } from "@mui/material";
import generatePDF from "react-to-pdf";
import MilkAnalyticsContent from "./MilkAnalyticsContent";
import {
  ButtonPrimary,
  TypographyPrimary,
} from "../../../../ComponentsV2/themeComponents";
import { Spinner } from "../../../../ComponentsV2";

const PDFPreview = ({ data, isLoading }) => {
  const [eleRef, useEleRef] = useState(null);
  const [pdfLoading, setPDFLoading] = useState(false);

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
    <Stack width={'100%'} direction={'column'} alignItems={'flex-end'}>
      <Stack  width={'100%'} p={2}  ref={useEleRef}>
        <TypographyPrimary sx={{ fontSize: "2.2rem", my: 1, mb: 0 }}>
          Milk Production Analytics
        </TypographyPrimary>
        <MilkAnalyticsContent data={data} isLoading={isLoading} />
      </Stack>
      <ButtonPrimary
      disabled={pdfLoading}
        sx={{
          p: "8px 15px",
          display: "flex",
          justifyContent: "center",
          m:2,
          mt:0
        }}
        startIcon={
          pdfLoading ? <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} /> : null
        }
        onClick={handlePDFDownload}
      >
        Download as PDF
      </ButtonPrimary>
    </Stack>
  );
};

export default PDFPreview;
