import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import { Spinner, TabPane } from "../../../../ComponentsV2";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import useUpdateDisposalDetails from "./hooks/useUpdateDisposalDetails";
import { useParams } from "react-router-dom";

const initialState = {
  disposalMode: "",
  challanNo: "",
  disposalDate: "",
  disposalTo: "",
  amount: "",
};
const LivestockDisposalDetails = ({ livestockInfo, infoLoading }) => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [disposalDetails, setDisposalDetails] = useState(initialState);

  useEffect(() => {
    setDisposalDetails({
      disposalMode: livestockInfo?.disposalMode,
      challanNo: livestockInfo?.challanNo,
      disposalDate: livestockInfo?.disposalDate,
      disposalTo: livestockInfo?.disposalTo,
      amount: livestockInfo?.amount,
    });
  }, [infoLoading]);

  const { isUpdating, updateDisposalDetails } = useUpdateDisposalDetails(id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisposalDetails({ ...disposalDetails, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateDisposalDetails(disposalDetails, {
        onSuccess: (data) => {
          if (data.status === 200) {
            setIsEdit((prev) => !prev);
          }
        },
      });
    } else {
      setIsEdit((prev) => !prev);
    }
  };
  return (
    <form onSubmit={handleFormSubmit} style={{ width: "100%" }}>
      <Stack
        width="100%"
        sx={{ background: "#F7F8FD", p: 2, borderRadius: "10px", gap: 1 }}
      >
        <TabPane
          text="Disposal Details"
          loading={isUpdating}
          btnText={isEdit ? "Save" : "Edit"}
          btnIcon={
            isUpdating ? (
              <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
            ) : null
          }
          hover={true}
          type="submit"
        />
        <Stack direction={"column"} gap={2}>
          <CustomTextField
            disabled={!isEdit}
            label={"Disposal mode"}
            value={disposalDetails?.disposalMode}
            name={"disposalMode"}
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"challanNo"}
            value={disposalDetails?.challanNo}
            name={"challanNo"}
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"disposalDate"}
            value={disposalDetails?.disposalDate}
            name={"disposalDate"}
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"disposalTo"}
            value={disposalDetails?.disposalTo}
            name={"disposalTo"}
            onInputChange={handleChange}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"amount"}
            value={disposalDetails?.amount}
            name={"amount"}
            onInputChange={handleChange}
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default LivestockDisposalDetails;
