import { Box, Button, Stack } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  TabPane,
  CustomInput,
  StatusCard,
  Spinner,
  Skeleton,
  CustomModal,
} from "../../../ComponentsV2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TypographyPrimary } from "../../../ComponentsV2/themeComponents";
import { request } from "../../../apis/axios-utils";
import { addCollarValidationSchema } from "../../../utils/validationSchema";
import useCollarContext from "../../../hooks/useCollarContext";
import { pedometerStatusCardData } from "../Data";
import useGetCamelCase from "../../../hooks/useGetCamelCase";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { QrCodeIcon } from "../../../icons";
import ShowQRModalContent from "../../PDFPage/ShowQRModalContent";
import { useQueryClient } from "react-query";
import { toast } from "react-hot-toast";

const Overview = ({ data, deviceLoading }) => {
  const [isEditCollarInfo, setIsEditCollarInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collarInfoEdit, setCollarInfoEdit] = useState({
    collarUID: "",
    collarName: "",
    collarMacId: "",
  });
  const { getErrorMessage } = useErrorMessage();
  const { openBackdropLoader } = useCollarContext();

  const { isError, setIsError, openSnackbarAlert } = useCollarContext();
  const { getCamelCase } = useGetCamelCase();

  useEffect(() => {
    setCollarInfoEdit({
      collarUID: data?.collarUid,
      collarName: data?.collarName,
      collarMacId: data?.collarMacId,
    });
    setValue("collarUID", data?.collarUid || "");
    setValue("collarName", data?.collarName || "");
    setValue("collarMacId", data?.collarMacId || "");
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addCollarValidationSchema) });
  const queryClient = useQueryClient();

  const handleCollarInfoEditChange = (e) => {
    const { name, value } = e.target;
    setCollarInfoEdit({ ...collarInfoEdit, [name]: value });
  };

  const handelCollarNewInfo = async () => {
    setIsEditCollarInfo(true);
    if (isEditCollarInfo) {
      setLoading(true);
      const body = {
        deviceName: collarInfoEdit?.collarName,
        uID: collarInfoEdit?.collarUID,
        macID: collarInfoEdit?.collarMacId,
      };
      try {
        const editRes = await request({
          url: `/devices/update?deviceID=${data.collarId}`,
          method: "PATCH",
          data: body,
        });
        if (editRes.status === 200) {
          toast.success("Pedometer successfully edited :)");
          setIsEditCollarInfo(false);
          setIsError({
            error: false,
            message: null,
          });
          queryClient.invalidateQueries(["getDeviceById"]);
        } else if (editRes?.response?.data?.statusCode === 409) {
          setIsError({
            error: true,
            message: editRes?.response?.data?.message,
          });
        } else {
          throw new Error(getErrorMessage(editRes));
        }
      } catch (err) {
        toast.error( err.message);
        setIsEditCollarInfo(false);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatus = (ele, data) => {
    const label = ele?.text?.toLowerCase();
    const status = data?.status?.toLowerCase();

    if (label === "status" && status === "online") {
      return "green";
    } else if (label === "status" && status === "offline") {
      return "red";
    } else {
      return ele?.statusColor;
    }
  };
  return (
    <form onSubmit={handleSubmit(handelCollarNewInfo)}>
      <Stack my={4} direction="row" justifyContent="space-between">
        {!deviceLoading ? (
          <Stack
            sx={{
              width: "55%",
              background: "#F7F8FD",
              p: 2,
              borderRadius: "10px",
            }}
          >
            <Box px={1.5}>
              <TabPane
                text="Pedometer Information"
                btnText={isEditCollarInfo ? "Save" : "Edit"}
                loading={loading}
                btnIcon={
                  loading ? (
                    <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} />
                  ) : (
                    false
                  )
                }
                hover={true}
                type="submit"
              />
            </Box>
            <Stack>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                  mt: 1,
                }}
              >
                <CustomInput
                  disabled={!isEditCollarInfo}
                  label="pedometer UID"
                  register={register}
                  errors={errors}
                  value={collarInfoEdit?.collarUID}
                  name="collarUID"
                  isError={isError}
                  onChange={handleCollarInfoEditChange}
                />
                <CustomInput
                  disabled={!isEditCollarInfo}
                  label="pedometer name"
                  register={register}
                  errors={errors}
                  value={collarInfoEdit?.collarName}
                  name="collarName"
                  onChange={handleCollarInfoEditChange}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <CustomInput
                  disabled={!isEditCollarInfo}
                  label="pedometer MAC ID"
                  register={register}
                  errors={errors}
                  value={collarInfoEdit?.collarMacId}
                  name="collarMacId"
                  onChange={handleCollarInfoEditChange}
                />
              </Box>
            </Stack>
          </Stack>
        ) : (
          <Skeleton
            width="42vw"
            height={"245px"}
            sx={{ background: "#F7F8FD" }}
          />
        )}
        {deviceLoading ? (
          <Skeleton
            width="33vw"
            height={"245px"}
            sx={{ background: "#F7F8FD" }}
          />
        ) : (
          <Box
            sx={{
              width: "43%",
              background: "#F7F8FD",
              p: 2,
              borderRadius: "10px",
              justifyContent: "space-evenly",
            }}
          >
            <TypographyPrimary>Pedometer status</TypographyPrimary>
            <Stack direction="column" gap={2}>
              {pedometerStatusCardData
                ?.filter((ele) => !ele?.text?.toLowerCase()?.includes("collar"))
                ?.map((ele) => ({
                  ...ele,
                  status: data ? `${data[getCamelCase(ele?.text)]}` : "",
                  statusColor: getStatus(ele, data),
                }))
                .map((card) => (
                  <StatusCard
                    key={card.text}
                    text={card.text}
                    status={card.status}
                    icon={card.icon}
                    statusColor={card.statusColor}
                    suffix={card.suffix}
                  />
                ))}
              <StatusCard
                key={"qr"}
                text={" QR"}
                status={""}
                icon={<QrCodeIcon fontSize="large" sx={{ mr: 1 }} />}
                statusColor={"red"}
                suffix={""}
                actions={[
                  <Button
                    variant="text"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "13px",
                      py: 0,
                      letterSpacing: 1,
                    }}
                    onClick={() => setModal(true)}
                  >
                    View
                  </Button>,
                ]}
              />
            </Stack>
          </Box>
        )}
        <CustomModal
          content={
            <ShowQRModalContent
              id={collarInfoEdit?.collarMacId}
              title="Pedometer"
            />
          }
          customWidth="25%"
          customWidthMd="40%"
          customWidthSm="50%"
          openModal={modal}
          handleClose={() => setModal(false)}
        />
      </Stack>
    </form>
  );
};

export default Overview;
