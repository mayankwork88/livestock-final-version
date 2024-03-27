import AdminUIContainer from "../../layout/AdminUIContainer";
import {
  CustomTabs,
  TabPane,
  CustomModal,
  BackdropLoader,
} from "../../ComponentsV2";
import { Container } from "@mui/material";
import AddLivestockModalContent from "./AddLivestockModalContent";
import useLivestockContext from "../../hooks/useLivestockContext";
import { livestockTabData, livestockBreadcrumbData } from "./Data";

const Livestocks = () => {
  const {
    openAddLiveStockModal,
    openBackdropLoader,
    modalContentType,
    handleLivestockModalOpen,
    handleLivestockModalClose,
    showConfirmModal,
    handleLivestockDeleteConfirm,
    handleConfirmWindowClose,
    snackbarAlert,
    onSnackbarAlertClose,
  } = useLivestockContext();

  const contentType = () => {
    if (modalContentType === "add") {
      return <AddLivestockModalContent />;
    }
  };

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={handleLivestockDeleteConfirm}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={livestockBreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 3, pb: 0}}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        <TabPane
          text="All Livestock"
          btnText="Add Livestock"
          btnIcon={true}
          hover={true}
          onBtnClick={() => handleLivestockModalOpen("add")}
        />
        <CustomModal
          content={contentType()}
          openModal={openAddLiveStockModal}
          handleClose={handleLivestockModalClose}
        />
        <CustomTabs tabData={livestockTabData} />
      </Container>
    </AdminUIContainer>
  );
};

export default Livestocks;
