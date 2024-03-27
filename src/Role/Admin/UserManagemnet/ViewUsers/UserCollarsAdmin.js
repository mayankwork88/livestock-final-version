import {
  CustomModal,
  CustomPagination,
  CustomTable,
  NoData,
  TabPane,
  TableSkeleton,
  ConfirmWindowModalContent,
} from "../../../../ComponentsV2";
import { Box, Stack } from "@mui/material";
import useGetAllDevices from "../hooks/useGetAllDevices";
import { useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import ShowLivestocks from "../../../../pages/Collars/viewCollarDetails/showLivestocks";
import useGetUnassignDevices from "../hooks/useGetUnassignDevices";
import useAssignCollar from "../hooks/useAssignCollar";
import useUnassignDevice from "../hooks/useUnassignDevice";
import {getTabText, handleSearchQuery} from "../utils/utils" 

const headings = [
  "collar id",
  "collar name",
  "status",
  "current status",
  "added on",
  "actions",
];
const UserCollarsAdmin = () => {
  const [pagination, setPagination] = useState(1);
  const [unassignDevicesPag, setUnassignDevicesPag] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [modalContentType, setModalContentType] = useState("assign");
  const [unassignCollar, setUnassignCollar] = useState(null);
  const [unassignDevicesQuery, setUnassignDevicesQuery] = useState("");
  const { id } = useParams();
  const { isLoading, error, devices, dataLength } = useGetAllDevices(
    id,
    "collar",
    unassignDevicesPag,
    query,
    handleCollarUnassign
  );
  const {
    unassignDevicesLoading,
    unassignDevicesError,
    unassignDevicesData,
    unassignDevicesDataLength,
  } = useGetUnassignDevices("collar", pagination, unassignDevicesQuery);

  const { isAssigning, assignCollar } = useAssignCollar("Collar");

  const { isUnassign, unassignDevice } = useUnassignDevice("Collar");

  if (error) {
    toast.error(error?.message);
  }

  const handleCollarAssign = (selectedValue) => {
    const body = {
      deviceId: selectedValue,
      userId: id,
    };
    assignCollar(body, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };

  const handleCollarUnassignConfirm = () => {
    const body = {
      deviceId: unassignCollar,
      userId: id,
    };
    unassignDevice(body, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };

  function handleCollarUnassign(collarId) {
    setShowModal(true);
    setModalContentType("unassign");
    setUnassignCollar(collarId);
  }

  const modalContent = () => {
    if (modalContentType === "assign") {
      return (
        <ShowLivestocks
          title="collar"
          data={unassignDevicesData}
          dataLength={unassignDevicesDataLength}
          pagination={unassignDevicesPag}
          setPagination={(page) => {
            setUnassignDevicesPag(page);
          }}
          onSubmit={handleCollarAssign}
          assigning={isAssigning}
          setOpenAddLivestockModal={() => setShowModal(false)}
          loading={unassignDevicesLoading}
          onSearch={(term) => handleSearchQuery(term, setUnassignDevicesQuery)}
        />
      );
    } else {
      return (
        <ConfirmWindowModalContent
          loading={isUnassign}
          onCancel={() => {
            setShowModal(false);
            setUnassignCollar(null);
          }}
          onConfirm={handleCollarUnassignConfirm}
          showConfirmBtn={true}
        />
      );
    }
  };

  return (
    <Stack my={4}>
      <TabPane
        text={getTabText('collar', dataLength)}
        btnText={"assign collar"}
        btnIcon={true}
        hover={true}
        search={true}
        minWidth="15rem"
        onSearch={(term) => handleSearchQuery(term, setQuery)}
        onBtnClick={() => {
          setModalContentType("assign");
          setShowModal(true);
        }}
      />
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
            tableRowData={devices}
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
      <CustomModal
        content={modalContent()}
        openModal={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </Stack>
  );
};

export default UserCollarsAdmin;
