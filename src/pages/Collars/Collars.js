import React from "react";
import {
  CustomTabs,
  TabPane,
  CustomModal,
  BackdropLoader,
} from "../../ComponentsV2";
import { Stack } from "@mui/material";
import AddCollarModalContent from "./AddCollarModalContent";
import { useContext } from "react";
import { CollarContext } from "../../context/CollarContext";
import {collarTabData} from "./Data";


const Collars = () => {
  const {
    openAddCollarModal,
    openBackdropLoader,
    handleCollarModalOpen,
    modalContentType,
    handleCollarModalClose,
  } = useContext(CollarContext);

  const contentType = () => {
    if (modalContentType === "add") {
      return <AddCollarModalContent />;
    }
  };

  const BreadcrumbData = [
    {
      label: "collar management",
      link: "collars",
    },
  ];
  return (
    <Stack width="100%">
    {/* <BackdropLoader open={openBackdropLoader} /> */}
    <TabPane
      text="All Collars"
      btnText="Add New Collar"
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

export default Collars;
