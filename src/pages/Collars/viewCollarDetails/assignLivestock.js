import { Box, Stack } from "@mui/material";
import { AddBtn, CustomModal, Skeleton, Spinner } from "../../../ComponentsV2";
import ShowLivestocks from "./showLivestocks";
import LivestockInfo from "./livestockInfo";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { useState } from "react";
import useCollarContext from "../../../hooks/useCollarContext";
import useAssignLivestock from "../../../hooks/services/useAssignLivetock";
import useRemoveLivestock from "../../../hooks/services/useRemoveLivestock";
import useGetUnassignLivestock from "../../../hooks/services/useGetUnassignLivestocks";
import { handleSearchQuery } from "../../../Role/Admin/UserManagemnet/utils/utils";
import toast from "react-hot-toast";

const AssignLivestock = ({ data, deviceLoading }) => {
  const [pagination, setPagination] = useState(1);
  const [query, setQuery] = useState("");
  const { openAddLiveStockModal, setOpenAddLivestockModal } =
    useLivestockContext();
  const { openSnackbarAlert } = useCollarContext();


  const { isLoading, error, allUnassignLivestock, refetch, isSuccess } =
    useGetUnassignLivestock("collar",query, pagination);
  const { isAssigning, assignLivestock } = useAssignLivestock("collar");
  const { isRemoving, removeLivestock } = useRemoveLivestock("collar");

  const handleFetchUnassignLivestock = () => {
    // refetch();
    // if (!isLoading && !error && data && isSuccess) {
    setOpenAddLivestockModal(true);
    // }
  };

  const handleAssignLivestock = (selectedValue) => {
    const body = {
      liveStockID: selectedValue,
      deviceID: data?.collarId,
    };

    assignLivestock(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
          setOpenAddLivestockModal(false);
        }
      },
    });
  };

  const handleRemoveLivestock = (collarId, livestockId) => {
    const body = {
      liveStockID: livestockId,
      deviceID: collarId,
    };

    removeLivestock(body, {
      onSuccess: (data) => {
        if (data.status === 200) {
        }
      },
    });
  };

  return (
    <Box py={4}>
      {!deviceLoading ? (
        data?.Uid ? (
          <Stack sx={{ width: { lg: "55%", md: "100%" } }}>
            <LivestockInfo
              data={data}
              btnText="remove"
              btnBgColor="#FF0505"
              loading={isRemoving}
              btnIcon={
                null ? (
                  <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                ) : null
              }
              onBtnClick={handleRemoveLivestock}
            />
          </Stack>
        ) : (
          <Stack direction={"row"}>
            <AddBtn
              text1="livestock"
              text2="collar"
              loading={isLoading}
              onClick={handleFetchUnassignLivestock}
            />
          </Stack>
        )
      ) : (
        <Skeleton width="43vw" height="60vh" sx={{ background: "#F7F8FD" }} />
      )}
      <CustomModal
        content={
          <ShowLivestocks
            data={allUnassignLivestock?.liveStockData}
            dataLength={allUnassignLivestock?.dataLength}
            pagination={pagination}
            setPagination={(page) => {
              setPagination(page);
            }}
            onSubmit={handleAssignLivestock}
            setOpenAddLivestockModal={setOpenAddLivestockModal}
            loading={isAssigning}
            openSnackbarAlert={() =>
              toast.error("Please choose a livestock to assign")
            }
            onSearch={(term) => handleSearchQuery(term, setQuery)}
            isLivestock={true}
          />
        }
        openModal={openAddLiveStockModal}
        handleClose={() => setOpenAddLivestockModal(false)}
      />
    </Box>
  );
};

export default AssignLivestock;
