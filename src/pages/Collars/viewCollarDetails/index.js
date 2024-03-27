import AdminUIContainer from "../../../layout/AdminUIContainer";
import { CustomTabs, Skeleton } from "../../../ComponentsV2";
import { Container } from "@mui/material";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { useParams } from "react-router-dom";
import useCollarContext from "../../../hooks/useCollarContext";
import {
  viewCollarDetailTabData,
  viewCollarDetailsBreadcrumbData,
} from "../Data";
import useGetDeviceById from "../../../hooks/services/useGetDeviceById";

const ViewCollarDetails = () => {
  const { id } = useParams();
  const { snackbarAlert, onSnackbarAlertClose } = useCollarContext();

  const { isLoading, error, deviceData } = useGetDeviceById(id);

  return (
    <AdminUIContainer
      openAlert={snackbarAlert.open}
      alertMessage={snackbarAlert.message}
      alertType={snackbarAlert.type}
      closeAlert={onSnackbarAlertClose}
      BreadcrumbData={viewCollarDetailsBreadcrumbData(deviceData)}
    >
      <Container maxWidth="xl" sx={{ marginTop: 3, pb: 5 }}>
        {/* <BackdropLoader open={openBackdropLoader} /> */}
        {isLoading ? (
          <Skeleton
            width="77.5vw"
            height={"65px"}
            sx={{ background: "#F7F8FD" }}
          />
        ) : (
          <TypographyPrimary sx={{ textTransform: "capitalize", fontSize: 21 }}>
            {deviceData?.collarUid}
          </TypographyPrimary>
        )}
        <CustomTabs tabData={viewCollarDetailTabData(deviceData, isLoading)} />
      </Container>
    </AdminUIContainer>
  );
};

export default ViewCollarDetails;
