import {
  ConfirmWindowModalContent,
  CustomModal,
  CustomTabs,
  TabPane,
} from "../../../../ComponentsV2";
import { Stack } from "@mui/material";
import { useState } from "react";
import ShowUserLivestock from "./ShowUserLivestock";
import ShowLivestocks from "../../../../pages/Collars/viewCollarDetails/showLivestocks";
import useGetUnassignLivestock from "../hooks/useGetUnassignLivestock";
import { useParams } from "react-router-dom";
import useAssignLivestock from "../hooks/useAssignLivestock";
import useGetAllLivestock from "../hooks/useGetAllLivestock";
import toast from "react-hot-toast";
import useUnassignLivestock from "../hooks/useUnassignLivestock";
import {getTabText, handleSearchQuery} from "../utils/utils";

export const livestockTabData = (
  isLoading,
  livestock,
  dataLength,
  pagination,
  setPagination
) => [
  {
    label: "All Livestock",
    child: (
      <ShowUserLivestock
        isLoading={isLoading}
        livestock={livestock}
        dataLength={dataLength}
        pagination={pagination}
        setPagination={setPagination}
      />
    ),
  },
  {
    label: "Safe",
    child: (
      <ShowUserLivestock
        isLoading={isLoading}
        livestock={livestock}
        dataLength={dataLength}
        pagination={pagination}
        setPagination={setPagination}
      />
    ),
  },
  {
    label: "Unsafe",
    child: (
      <ShowUserLivestock
        isLoading={isLoading}
        livestock={livestock}
        dataLength={dataLength}
        pagination={pagination}
        setPagination={setPagination}
      />
    ),
  },
];

const UserLivestockAdmin = () => {
  const [pagination, setPagination] = useState(1);
  const [unassignLivestockPag, setUnassignLivestockPag] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [tabStatus, setTabStatus] = useState("");
  const [modalContentType, setModalContentType] = useState("assign");
  const [unassignLivestockId, setUnassignLivestockId] = useState(null);
  const [unassignLivestockQuery, setUnassignLivestockQuery] = useState("");
 
  const { id } = useParams();

  const { isLoading, error, livestock, dataLength } = useGetAllLivestock(
    id,
    pagination,
    query,
    tabStatus,
    handleLivestockUnassign
  );

  const {
    unassignLivestockLoading,
    unassignLivestockError,
    unassignLivestockData,
    unassignLivestockDataLength,
  } = useGetUnassignLivestock(unassignLivestockPag, unassignLivestockQuery);

  const { isAssigning, assignLivestock } = useAssignLivestock();

  const { isUnassign, unassignLivestock } = useUnassignLivestock();

  const handleLivestockAssign = (selectedValue) => {
    const body = {
      livestockId: selectedValue,
      userId: id,
    };
    assignLivestock(body, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };

  const handleLivestockUnassignConfirm = () => {
    const body = {
      livestockId: unassignLivestockId,
      userId: id,
    };
    unassignLivestock(body, {
      onSuccess: (data) => {
        if (data?.status === 200) {
          setShowModal(false);
        }
      },
    });
  };

  const handleTabStatusChange = (status) => {
    if (status === 0) setTabStatus("");
    else if (status === 1) setTabStatus("safe");
    else if (status === 2) setTabStatus("unsafe");
  };

  if (unassignLivestockError) {
    toast.error("Error" + unassignLivestockError?.error);
  }

  function handleLivestockUnassign(livestockId) {
    setShowModal(true);
    setModalContentType("unassign");
    setUnassignLivestockId(livestockId);
  }

  const modalContent = () => {
    if (modalContentType === "assign") {
      return (
        <ShowLivestocks
          data={unassignLivestockData}
          dataLength={unassignLivestockDataLength}
          pagination={unassignLivestockPag}
          setPagination={(page) => {
            setUnassignLivestockPag(page);
          }}
          isLivestock={true}
          assigning={isAssigning}
          onSubmit={handleLivestockAssign}
          setOpenAddLivestockModal={() => setShowModal(false)}
          loading={unassignLivestockLoading}
          onSearch={(term) => {
            handleSearchQuery(term, setUnassignLivestockQuery);
          }}
        />
      );
    } else {
      return (
        <ConfirmWindowModalContent
          loading={isUnassign}
          onCancel={() => {
            setShowModal(false);
            setUnassignLivestockId(null);
          }}
          onConfirm={handleLivestockUnassignConfirm}
          showConfirmBtn={true}
        />
      );
    }
  };

  return (
    <Stack my={4}>
      <TabPane
        text={getTabText("livestock", dataLength)}
        btnText={"assign livestock"}
        btnIcon={true}
        hover={true}
        minWidth="18rem"
        search={true}
        onSearch={(term) => handleSearchQuery(term, setQuery)}
        onBtnClick={() => {
          setShowModal(true);
          setModalContentType("assign");
        }}
      />

      <CustomTabs
        onTabChange={handleTabStatusChange}
        tabData={livestockTabData(
          isLoading,
          livestock,
          dataLength,
          pagination,
          setPagination
        )}
      />
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

export default UserLivestockAdmin;
