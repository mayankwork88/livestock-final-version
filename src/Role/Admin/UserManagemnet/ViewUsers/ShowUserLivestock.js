import React from "react";
import {
  CustomModal,
  CustomPagination,
  CustomTable,
  CustomTabs,
  NoData,
  TabPane,
  TableSkeleton,
} from "../../../../ComponentsV2";
import { Box, Stack } from "@mui/material";
import useGetAllDevices from "../hooks/useGetAllDevices";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useGetAllLivestock from "../hooks/useGetAllLivestock";

const headings = [
  "uid",
  "livestock name",
  "collar uid",
  "created on",
  "current status",
  "last update",
  "actions",
];

const ShowUserLivestock = ({
  isLoading,
  livestock,
  dataLength,
  pagination,
  setPagination,
}) => {
  return (
    <Box my={4}>
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(5).fill("15%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={headings}
          tableRowData={livestock}
        />
      )}

      {dataLength ? (
        dataLength > 10 ? (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={pagination}
              count={Math.ceil(dataLength / 10)}
              onPageChange={(pageNo) => setPagination(pageNo)}
            />
          </Stack>
        ) : null
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default ShowUserLivestock;
