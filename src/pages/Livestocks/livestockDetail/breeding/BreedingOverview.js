import React, { useEffect, useState } from "react";
import BreedingCard from "./BreedingCard";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { overallStats, aiStats } from "./Data";
import { useTheme } from "@emotion/react";
import useGetBreedingData from "./hooks/useGetBreedingData";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { CustomModal, Skeleton } from "../../../../ComponentsV2";
import useUpdateDryingDate from "./hooks/useUpdateDryingDate";
import useDateFormat from "../../../../hooks/useDateFormat";
import DryingDateContent from "./DryingDateContent";
import { ordinalNumber } from "../../../../Role/Admin/UserManagemnet/utils/utils";

const BreedingOverview = () => {
  const { paginationDateFormat } = useDateFormat();
  const [showModal, setShowModal] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const theme = useTheme();
  const { id } = useParams();

  const { isLoading, error, data } = useGetBreedingData(id);
  const { isUpdating, updateDryingDate } = useUpdateDryingDate(id);

  const handleDryingDateUpdate = (selectedDate) => {
    const body = {
      id: selectedPeriod?._id,
      dryingDate: paginationDateFormat(selectedDate),
    };
    if (selectedDate > new Date(selectedPeriod?.reBreedingDate)) {
      updateDryingDate(body, {
        onSuccess: (data) => {
          if (data.status === 200) {
            setShowModal(false);
          }
        },
      });
    } else {
      toast?.error("Drying date must be greater than re-breeding date");
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPeriod(null);
  };

  if (error) {
    toast.error(error?.message);
  }
  return (
    <Stack width="100%" direction={"column"} gap={2}>
      <Stack direction={"row"} gap={3} alignItems={"flex-start"}>
        {isLoading ? (
          <>
            <Skeleton width={"100%"} height={"44vh"} />
            <Skeleton width={"100%"} height={"44vh"} />
          </>
        ) : (
          <>
            <BreedingCard
              data={{
                ...overallStats,
                data: Object.entries(data?.overAllStatus || {}),
              }}
            />
            <BreedingCard
              data={{
                ...aiStats,
                data: Object.entries(data?.aiStatusData || {}),
              }}
            />
          </>
        )}
      </Stack>
      {data?.interCalvingData?.length ? (
        <>
          <Divider sx={{ borderWidth: "1.5px" }} />
          <Typography
            fontSize={"24px"}
            sx={{
              fontWeight: "600",
              textTransform: "capitalize",
              color: theme.palette.primary.main,
              margin: "0 auto",
            }}
          >
            Inter-Calving Periods
          </Typography>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 3,
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {isLoading ? (
              <>
                <Skeleton width={"49%"} height={"44vh"} />
                <Skeleton width={"49%"} height={"44vh"} />
              </>
            ) : (
              <>
                {data?.interCalvingData?.map((ele, ind) => (
                  <Box width={"48%"}>
                    <BreedingCard
                      data={{
                        heading: `${ordinalNumber(
                          ind + 1
                        )} Inter-Calving Period`,
                        data: Object.entries(ele)?.filter(
                          (ele) => ele[0] !== "_id"
                        ),
                      }}
                      isDryingDateEditable={true}
                      onDryingDateEdit={() => {
                        if (
                          ele?.reBreedingDate &&
                          ele?.reBreedingDate?.toLowerCase() !== "n/a"
                        ) {
                          setShowModal(true);
                          setSelectedPeriod(ele);
                        } else {
                          toast.error(
                            "Can't update drying date before re-breeding date"
                          );
                        }
                      }}
                    />
                  </Box>
                ))}
              </>
            )}
          </Stack>
        </>
      ) : null}
      <CustomModal
        content={
          <DryingDateContent
            onClose={handleModalClose}
            dryingDate={
              selectedPeriod?.dryingDate &&
              selectedPeriod?.dryingDate?.toString()?.toUpperCase() !== "N/A"
                ? selectedPeriod?.dryingDate
                    ?.toString()
                    ?.toLowerCase()
                    ?.includes("gmt")
                  ? selectedPeriod?.dryingDate
                  : new Date(selectedPeriod?.dryingDate)
                : new Date()
            }
            onSubmit={handleDryingDateUpdate}
            isUpdating={isUpdating}
          />
        }
        openModal={showModal}
        customWidth={"400px"}
        handleClose={handleModalClose}
      />
    </Stack>
  );
};

export default BreedingOverview;
