import React from "react";
import {
  CustomTabs,
  TabPane,
  CustomModal,
  BackdropLoader,
  NoData
} from "../../ComponentsV2";
import { Stack } from "@mui/material";
import AddPedometerModalContent from "./AddPedometerModalContent";
import { useContext } from "react";
import { CollarContext } from "../../context/CollarContext";
import { collarTabData } from "./Data";

const Pedometer = () => {
  const {
    openAddCollarModal,
    openBackdropLoader,
    handleCollarModalOpen,
    modalContentType,
    handleCollarModalClose,
    showConfirmModal,
    handleConfirmWindowClose,
    handleCollarDeleteConfirm,
    snackbarAlert,
    onSnackbarAlertClose,
  } = useContext(CollarContext);

  const contentType = () => {
    if (modalContentType === "add") {
      return <AddPedometerModalContent />;
    }
  };

  return (
    <Stack>
      {/* <NoData/> */}
      {/* <BackdropLoader open={openBackdropLoader} /> */}
      <TabPane
        text="All Pedometers"
        btnText="Add New Pedometer"
        hover={true}
        btnIcon={true}
        onBtnClick={() => handleCollarModalOpen("add")}
      />
      <CustomModal
        content={contentType()}
        openModal={openAddCollarModal}
        handleClose={handleCollarModalClose}
      />
      <CustomTabs tabData={collarTabData} />
    </Stack>
  );
};

export default Pedometer;
