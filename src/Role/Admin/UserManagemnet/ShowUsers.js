import { Box, Stack } from "@mui/material";
import {
  ConfirmWindowModalContent,
  CustomModal,
  CustomPagination,
  CustomTable,
  NoData,
  TableSkeleton,
} from "../../../ComponentsV2";

const userHeadings = [
  "username",
  "email",
  "collars",
  "pedometers",
  "livestock",
  "actions",
];

const ShowUsers = ({
  isLoading,
  data,
  dataLength,
  pagination,
  setPagination,
  isDeleting,
  setShowModal,
  setDeleteUserId,
  handleUserDeleteConfirm,
  showModal,
}) => {
  return (
    <Box my={4}>
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(7).fill("12%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <CustomTable
          headBackgroundColor="#B58B5D"
          tableHeadData={userHeadings}
          tableRowData={data}
        />
      )}
      {dataLength > 10 && !isLoading ? (
        <Stack direction="row" justifyContent="center" p={2}>
          <CustomPagination
            size="large"
            page={pagination}
            count={Math.ceil(dataLength / 10)}
            onPageChange={(pageNo) => setPagination(pageNo)}
          />
        </Stack>
      ) : null}

      {!dataLength && !isLoading ? (
        <Stack sx={{ pt: 10 }}>
          <NoData />
        </Stack>
      ) : null}
      <CustomModal
        content={
          <ConfirmWindowModalContent
            loading={isDeleting}
            onCancel={() => {
              setShowModal(false);
              setDeleteUserId(null);
            }}
            onConfirm={handleUserDeleteConfirm}
            showConfirmBtn={true}
          />
        }
        openModal={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </Box>
  );
};

export default ShowUsers;
