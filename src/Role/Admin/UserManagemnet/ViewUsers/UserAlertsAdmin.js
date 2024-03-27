import {
  BackdropLoader,
  TableV2,
  ExportAsCSV,
  CustomPagination,
  NoData,
  TabPaneV2,
  TableSkeleton,
} from "../../../../ComponentsV2";
import { Container, IconButton, Stack, Typography } from "@mui/material";
import { TypographyPrimary } from "../../../../ComponentsV2/themeComponents";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import useGetAllAlerts from "../hooks/useGetAllAlerts";
import toast from "react-hot-toast";
import { useState } from "react";
import { useParams } from "react-router-dom";

const tableHeadData = [
  "alert name",
  "collar uid",
  "livestock name",
  "threshold value",
  "alarm value",
  "time",
  "date",
  "actions",
];

const UserAlertsAdmin = () => {
  const [selectedDate, setSelectedDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { id } = useParams();
  const [pagination, setPagination] = useState(0);
  const { isLoading, error, alerts, dataLength } = useGetAllAlerts(
    id,
    pagination,
    selectedDate
  );

  const handleSnackBarAlert = () => {
    if (!dataLength) {
      toast.error("Nothing to Export");
    }
  };

  const tabText = `Showing ${(dataLength > 10 ? 10 : dataLength) || 0} out of ${
    dataLength || 0
  } Alerts`;

  return (
    <Stack my={4}>
      <Stack sx={{ width: "100%", pb: 3 }}>
        <Stack pb={2}>
          <TabPaneV2
            paneText={tabText}
            paneTextColor="#000"
            datePicker={true}
            clearBtn={false}
            btnText={
              false ? (
                <ExportAsCSV
                  headers={tableHeadData}
                  data={alerts}
                  fileName="alerts"
                >
                  Export
                </ExportAsCSV>
              ) : (
                "Export"
              )
            }
            onBtnClick={handleSnackBarAlert}
            btnColor="#fff"
            btnBg="#B58B5D"
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </Stack>
        {isLoading ? (
          <TableSkeleton
            rowNumber={new Array(10).fill(0)}
            tableCell={new Array(3).fill("28")}
          />
        ) : alerts?.length ? (
          <TableV2 tableHeadData={tableHeadData} tableRowData={alerts} />
        ) : null}
      </Stack>
      {!isLoading && alerts?.length ? (
        dataLength > 10 && (
          <Stack direction="row" justifyContent="center">
            <CustomPagination
              size="large"
              page={pagination}
              count={Math.ceil(dataLength / 10)}
              onPageChange={(pageNo) => setPagination(pageNo)}
            />
          </Stack>
        )
      ) : (
        <NoData />
      )}
    </Stack>
  );
};

export default UserAlertsAdmin;
