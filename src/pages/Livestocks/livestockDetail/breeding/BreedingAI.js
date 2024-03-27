import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { breedingAICardData, breedingAITableData } from "./Data";
import {
  ConfirmWindowModalContent,
  CustomLabel,
  CustomModal,
  CustomPagination,
  NoData,
  ParameterCard,
  Skeleton,
  Spinner,
  TabPane,
  TableSkeleton,
  TableV2,
} from "../../../../ComponentsV2";
import AddAiAttempt from "./AddAiAttempt";
import { useState } from "react";
import useGetAIAttempts from "./hooks/useGetAIAttempts";
import { useParams } from "react-router-dom";
import { getTabText } from "../../../../Role/Admin/UserManagemnet/utils/utils";
import {
  DeleteOutlineOutlinedIcon,
  EditIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";
import useDeleteAttempt from "./hooks/useDeleteAttempt";

const getLabel = (label) => {
  if (label?.toLowerCase() === "pending")
    return { text: "Pending", type: "warning" };
  if (label?.toLowerCase() === "success")
    return { text: "Passed", type: "success" };
  if (label?.toLowerCase() === "fail") return { text: "Failed", type: "error" };
};

const getExportFormattedData = (data) => {
  return data?.result?.map((ele) => ({
    artificialInsemination: ele?.aiAttemptNo,
    sireNo: ele?.sireNo,
    date: ele?.attemptDate,
    result: getLabel(ele?.result)?.text,
  }));
};

const getFormattedData = (data, handleShowModal) => {
  return data?.result?.map((ele) => ({
    aiAttemptNo: ele?.aiAttemptNo,
    sireNo: ele?.sireNo,
    attemptDate: ele?.attemptDate,
    result: (
      <CustomLabel
        text={getLabel(ele?.result)?.text}
        type={getLabel(ele?.result)?.type}
        width={125}
      />
    ),
    action: [
      getLabel(ele?.result)?.type === "warning" ? (
        <IconButton onClick={() => handleShowModal("update", ele)}>
          <EditIcon fontSize="large" />
        </IconButton>
      ) : (
        <IconButton onClick={() => handleShowModal("view", ele)}>
          <VisibilityOutlinedIcon fontSize="large" />
        </IconButton>
      ),
      <IconButton onClick={() => handleShowModal("delete", ele)}>
        <DeleteOutlineOutlinedIcon fontSize="large" />
      </IconButton>,
    ],
  }));
};

const BreedingAI = () => {
  const { id } = useParams();
  const [addNewAttemptModal, setAddNewAiAttempt] = useState(false);
  const [pagination, setPagination] = useState(1);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [contentType, setContentType] = useState(null);

  const { isLoading, error, data } = useGetAIAttempts(id, pagination);
  const { isDeleting, deleteAttempt } = useDeleteAttempt(id);

  const handleModalClose = () => {
    setAddNewAiAttempt(false);
  };

  const handleShowModal = (type, attempt) => {
    setAddNewAiAttempt(true);
    setContentType(type);
    if (type !== "add") setSelectedAttempt(attempt);
  };

  const handleDeleteAttempt = () => {
    deleteAttempt(selectedAttempt?._id, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          handleModalClose();
        }
      },
    });
  };

  const getModalContent = (type) => {
    const cases = {
      add: <AddAiAttempt onClose={handleModalClose} type="add" />,
      update: (
        <AddAiAttempt
          onClose={handleModalClose}
          type="update"
          selectedAttempt={selectedAttempt}
        />
      ),
      view: (
        <AddAiAttempt
          onClose={handleModalClose}
          type="view"
          selectedAttempt={selectedAttempt}
        />
      ),
      delete: (
        <ConfirmWindowModalContent
          showConfirmBtn={true}
          loading={isDeleting}
          onCancel={handleModalClose}
          onConfirm={handleDeleteAttempt}
        />
      ),
    };

    return cases[type];
  };
  return (
    <Stack width="100%">
      <Stack
        direction={"row"}
        flexWrap={"wrap"}
        sx={{ py: 2, gap: { lg: 2, md: 2, sm: 1 } }}
      >
        {isLoading ? (
          <>
            <Skeleton
              height={"121px"}
              sx={{ minWidth: "184px", flexGrow: 1 }}
            />
            <Skeleton
              height={"121px"}
              sx={{ minWidth: "142px", flexGrow: 1 }}
            />
            <Skeleton
              height={"121px"}
              sx={{ minWidth: "196px", flexGrow: 1 }}
            />
            <Skeleton
              height={"121px"}
              sx={{ minWidth: "217px", flexGrow: 1 }}
            />
          </>
        ) : (
          breedingAICardData?.map((ele) => (
            <ParameterCard
              label={ele.label}
              value={data?.overviewData[ele.key]}
              icon={ele.icon}
              colors={ele.colors}
              suffix={""}
            />
          ))
        )}
      </Stack>
      <TabPane
        text={getTabText("AI Attempts", data?.aiData?.dataLength)}
        btnText="Add New Attempt"
        hover={true}
        btnIcon={true}
        onBtnClick={() => handleShowModal("add")}
        exportable={true}
        csvFormate={{
          headers: breedingAITableData,
          data: getExportFormattedData(data?.aiData) || [],
          name: "ai_attempts",
        }}
      />
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(4).fill("20%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <Box mt={2}>
          <TableV2
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={breedingAITableData}
            tableRowData={getFormattedData(data?.aiData, handleShowModal)}
          />
        </Box>
      )}
      {data?.aiData?.dataLength ? (
        data?.aiData?.dataLength > 10 ? (
          <Stack direction="row" justifyContent="center" p={2}>
            <CustomPagination
              size="large"
              page={pagination}
              count={Math.ceil(data?.aiData?.dataLength / 10)}
              onPageChange={(pageNo) => setPagination(pageNo)}
            />
          </Stack>
        ) : null
      ) : (
        !isLoading && <NoData />
      )}
      <CustomModal
        content={getModalContent(contentType)}
        openModal={addNewAttemptModal}
        handleClose={() => {}}
      />
    </Stack>
  );
};

export default BreedingAI;
