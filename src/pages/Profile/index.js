import React, { useState } from "react";
import AdminUIContainer from "../../layout/AdminUIContainer";
import { BtnGroup, BackdropLoader } from "../../ComponentsV2";
import { Container, Stack } from "@mui/material";
import ShowProfile from "./showProfile";
import ProfileSecurity from "./profileSecurity";
import useProfileContext from "../../hooks/useProfileContext";
import useUserId from "../../hooks/useUserId";

const btnData = [
  {
    label: "profile",
  },
  {
    label: "security",
  },
];
const BreadcrumbData = [
  {
    label: "profile",
    link: "profile",
  },
];
const ProfilePage = () => {
  const [showProfileTab, setShowProfileTab] = useState("profile");

  const {
    showConfirmModal,
    handleConfirmWindowClose,
    handleConfirmAccountDelete,
    snackbarAlert,
    onSnackbarAlertClose,
    openBackdropLoader,
  } = useProfileContext();

  const userId = useUserId();

  return (
    <AdminUIContainer
      openModal={showConfirmModal.open}
      showConfirmBtn={showConfirmModal.confirmBtn}
      handleModalClose={handleConfirmWindowClose}
      onConfirm={handleConfirmAccountDelete}
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={BreadcrumbData}
    >
      <Container maxWidth="xl" sx={{ marginTop: 3, pb: 5 }}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        <Stack direction="column" alignItems={"center"}>
          <BtnGroup
            btnData={btnData}
            activeBtn={showProfileTab}
            onChange={(ele) => setShowProfileTab(ele)}
          />
          {showProfileTab === "profile" ? (
            <ShowProfile userId={userId} />
          ) : (
            <ProfileSecurity />
          )}
        </Stack>
      </Container>
    </AdminUIContainer>
  );
};

export default ProfilePage;
