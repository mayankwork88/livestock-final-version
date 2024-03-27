import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  TypographyWithBg,
  ButtonPrimary,
} from "../../../ComponentsV2/themeComponents";
import LivestockCard from "./livestockCard";
import {
  CustomPagination,
  SearchInput,
  NoData,
  Spinner,
} from "../../../ComponentsV2";

const ShowLivestocks = ({
  data,
  dataLength,
  pagination,
  setPagination,
  isLivestock,
  onSubmit,
  onSearch,
  setOpenAddLivestockModal,
  openSnackbarAlert,
  loading,
}) => {
  const [showLivestocks, setShowLivestocks] = useState(data);
  const [selectedValue, setSelectedValue] = useState();

  useEffect(() => {
    setShowLivestocks(data);
  }, [data]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleLivestockAssignSave = () => {
    if (selectedValue) {
      onSubmit(selectedValue);
    } else {
      openSnackbarAlert();
    }
  };

  return (
    <Box>
      <TypographyWithBg>Assign Livestock</TypographyWithBg>
      <Stack direction="row" p={4}>
        <SearchInput
          placeholder="Search Livestock Id or Name"
          name="search"
          onChange={(e) => onSearch(e.target.value)}
        />
      </Stack>
      {!loading ? (
        data?.length ? (
          <Stack direction="row" flexWrap="wrap" justifyContent="space-evenly">
            {showLivestocks?.map((el) => (
              <LivestockCard
                key={el._id}
                name={isLivestock ? el?.name : el?.deviceName}
                id={el.uID}
                value={el._id}
                handleChange={handleChange}
                selectedValue={selectedValue === el._id}
              />
            ))}
          </Stack>
        ) : (
          <NoData />
        )
      ) : (
        <Spinner />
      )}

      {dataLength ? (
        <Stack direction="row" justifyContent="center" py={5} pb={7}>
          {dataLength > 10 ? (
            <CustomPagination
              showFirstButton={true}
              showLastButton={true}
              size="large"
              page={pagination}
              count={Math.ceil(dataLength / 10)}
              onPageChange={(pageNo) => setPagination(pageNo)}
            />
          ) : null}
          <ButtonPrimary
            onClick={handleLivestockAssignSave}
            sx={{
              position: "absolute",
              right: "35px",
              background: "#05254C",
              padding: "5px 30px",
            }}
          >
            Save
          </ButtonPrimary>
        </Stack>
      ) : (
        <Stack direction="row" alignItems="center" py={5}>
          <ButtonPrimary
            onClick={() => setOpenAddLivestockModal(false)}
            sx={{
              position: "absolute",
              right: "35px",
              background: "#05254C",
              padding: "5px 30px",
            }}
          >
            Cancel
          </ButtonPrimary>
        </Stack>
      )}
    </Box>
  );
};

export default ShowLivestocks;
