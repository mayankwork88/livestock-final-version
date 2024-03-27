import { Box, IconButton, Stack } from "@mui/material";
import React, { useState } from "react";
import {
  ConfirmWindowModalContent,
  CustomModal,
  CustomPagination,
  NoData,
  TabPane,
  TableSkeleton,
  TableV2,
} from "../../../../ComponentsV2";
import {
  getTabText,
  handleSearchQuery,
} from "../../../../Role/Admin/UserManagemnet/utils/utils";
import {
  DeleteOutlineOutlinedIcon,
  VisibilityOutlinedIcon,
} from "../../../../icons";
import useGetAllCalfs from "./hooks/useGetAllCalfs";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import AddNewCalf from "./AddNewCalf";
import useDeleteCalf from "./hooks/useDeleteCalf";
import useLivestockContext from "../../../../hooks/useLivestockContext";
import useDateFormat from "../../../../hooks/useDateFormat";

const headers = ["calf UID", "Sire No", "Dam No", "DOB", "actions"];

const getExportFormattedData = (data, formattedDate) => {
  return data?.map((ele) => ({
    calfUid: ele?.uID,
    sireNo: ele?.sireNo,
    damNo: ele?.damNo,
    dob: formattedDate(ele?.dob, "date"),
  }));
};


const getFormattedData = (data, handleModalOpen, handleView, formattedDate) => {
  return data?.map((ele) => ({
    uID: ele?.uID,
    sireNo: ele?.sireNo,
    damNo: ele?.damNo,
    dob:formattedDate(ele?.dob, "date"),
    actions: [
      <IconButton onClick={() => handleView(ele)}>
        <VisibilityOutlinedIcon fontSize="large" />
      </IconButton>,
      <IconButton onClick={() => handleModalOpen("delete", ele?._id)}>
        <DeleteOutlineOutlinedIcon fontSize="large" />
      </IconButton>,
      ,
    ],
  }));
};

const Calf = () => {
  const { id } = useParams();
  const [query, setQuery] = useState("");
  const {formattedDate} = useDateFormat()
  const navigate = useNavigate();
  const [modal, setModal] = useState();
  const [contentType, setContentType] = useState("");
  const [selectedCalf, setSelectedCalf] = useState(null);
  const [pagination, setPagination] = useState();
  const { isLoading, error, data } = useGetAllCalfs(id, pagination, query);
  const { isDeleting, deleteCalf } = useDeleteCalf();
  const { setLivestockTabControl } = useLivestockContext();

  const handleModalOpen = (type, calf) => {
    setModal(true);
    setContentType(type);
    if (type === "delete") setSelectedCalf(calf);
  };

  const handleModalClose = () => {
    setModal(false);
    setContentType("");
  };

  const handleView = (ele) => {
    const bread = JSON.parse(localStorage.getItem("livestockBreadcrumb"));
    const newBread = [
      ...bread,
      { label: ele?.uID, link: `/livestocks/${ele?._id}`, tab:'true'},
    ];

    localStorage.setItem("livestockBreadcrumb", JSON.stringify(newBread));
    navigate(`/livestocks/${ele?._id}`);
    setLivestockTabControl(0);
    localStorage.setItem("currentTab", 0);
  };

  const handleDeleteEntry = () => {
    deleteCalf(selectedCalf, {
      onSuccess: (data) => {
        if (data.status === 200) {
          handleModalClose();
        }
      },
    });
  };

  const getModalContent = (type) => {
    if (type === "add") return <AddNewCalf onClose={handleModalClose} />;
    else if (type === "delete")
      return (
        <ConfirmWindowModalContent
          showConfirmBtn={true}
          loading={isDeleting}
          onCancel={handleModalClose}
          onConfirm={handleDeleteEntry}
        />
      );
  };
  return (
    <Stack>
      <Box sx={{ my: 4 }}>
        <TabPane
          text={getTabText("calf", data?.dataLength)}
          minWidth="12rem"
          btnText="Add calf"
          hover={true}
          btnIcon={true}
          onBtnClick={() => handleModalOpen("add")}
          search={true}
          onSearch={(term) => handleSearchQuery(term, setQuery)}
          exportable={true}
          csvFormate={{
            headers: headers,
            data: getExportFormattedData( data?.data, formattedDate)||[],
            name: "livestock_calfs_data",
          }}
        />
      </Box>
      {isLoading ? (
        <TableSkeleton
          rowNumber={new Array(10).fill(0)}
          tableCell={new Array(4).fill("20%")}
          actions={new Array(2).fill(0)}
        />
      ) : (
        <Box>
          <TableV2
            btnColor="#fff"
            btnBg="#B58B5D"
            tableHeadData={headers}
            tableRowData={getFormattedData(
              data?.data,
              handleModalOpen,
              handleView,
              formattedDate
            )}
          />
        </Box>
      )}
      {data?.dataLength
        ? data?.dataLength > 10 && (
            <Stack direction="row" justifyContent="center" p={2}>
              <CustomPagination
                size="large"
                page={pagination}
                count={Math.ceil(data?.data?.dataLength / 10)}
                onPageChange={(pageNo) => setPagination(pageNo)}
              />
            </Stack>
          ) : !isLoading && <NoData />}

      <CustomModal
        content={getModalContent(contentType)}
        openModal={modal}
        handleClose={() => contentType !== "add" && handleModalClose()}
      />
    </Stack>
  );
};

export default Calf;
