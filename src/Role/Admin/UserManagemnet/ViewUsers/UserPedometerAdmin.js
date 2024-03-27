import {
  ConfirmWindowModalContent,
  CustomModal,
  CustomPagination,
  CustomTable,
  NoData,
  TabPane,
  TableSkeleton,
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
  "pedometer id",
  "pedometer name",
  "status",
  "current status",
  "added on",
  "actions",
];
const UserPedometerAdmin = () => {
  const [pagination, setPagination] = useState(1);
  const [unassignDevicesPag, setUnassignDevicesPag] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [modalContentType, setModalContentType] = useState("assign");
  const [unassignPedometer, setUnassignPedometer] = useState(null);
  const [unassignDevicesQuery, setUnassignDevicesQuery] = useState("");
  const { id } = useParams();

  const { isLoading, error, devices, dataLength } = useGetAllDevices(
    id,
    "pedometer",
    pagination,
    query,
    handleCollarUnassign
  );

  const {
    unassignDevicesLoading,
    unassignDevicesError,
    unassignDevicesData,
    unassignDevicesDataLength,
  } = useGetUnassignDevices("pedometer", pagination, unassignDevicesQuery);

  const { isAssigning, assignCollar } = useAssignCollar("Pedometer");

  const { isUnassign, unassignDevice } = useUnassignDevice("Pedometer");

  if (error) {
    toast.error(error?.message);
  }


  const handlePedometerAssign = (selectedValue) => {
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

  const handlePedometerUnassignConfirm = () => {
    const body = {
      deviceId: unassignPedometer,
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

  function handleCollarUnassign(pedoId) {
    setShowModal(true);
    setModalContentType("unassign");
    setUnassignPedometer(pedoId);
  }

  const modalContent = () => {
    if (modalContentType === "assign") {
      return (
        <ShowLivestocks
          title="pedometer"
          data={unassignDevicesData}
          dataLength={unassignDevicesDataLength}
          pagination={unassignDevicesPag}
          setPagination={(page) => {
            setUnassignDevicesPag(page);
          }}
          onSubmit={handlePedometerAssign}
          assigning={isAssigning}
          setOpenAddLivestockModal={() => setShowModal(false)}
          loading={unassignDevicesLoading}
          openSnackbarAlert={() => {}}
          onSearch={(term) => handleSearchQuery(term, setUnassignDevicesQuery)}
        />
      );
    } else {
      return (
        <ConfirmWindowModalContent
          loading={isUnassign}
          onCancel={() => {
            setShowModal(false);
            setUnassignPedometer(null);
          }}
          onConfirm={handlePedometerUnassignConfirm}
          showConfirmBtn={true}
        />
      );
    }
  };
  return (
    <Stack my={4}>
      <TabPane
        text={getTabText("pedometer", dataLength)}
        btnText={"assign pedometer"}
        btnIcon={true}
        minWidth="19rem"
        hover={true}
        search={true}
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

export default UserPedometerAdmin;
