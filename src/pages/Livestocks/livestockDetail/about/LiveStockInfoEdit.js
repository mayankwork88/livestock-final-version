import React, { useEffect, useState } from "react";
import { Box, Stack } from "@mui/material";
import {
  ImageUpload,
  Spinner,
  TabPane,
  CustomInput,
} from "../../../../ComponentsV2";
import { LivestockCoverPhoto } from "../../../../assets";
import CustomTextField from "../../../Authentication/ui/CustomTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { livestockInfoSchema } from "../../../../utils/validationSchema";
import useLivestockInfoUpdate from "./hooks/useLivestockInfoUpdate";
import { useParams } from "react-router-dom";

const LiveStockInfoEdit = ({ livestockInfo, infoLoading }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [livestockImg, setLivestockImg] = useState(null);
  const [info, setInfo] = useState({
    uid: "",
    name: "",
    gender: "",
    breed: "",
  });

  const { id } = useParams();
  const { isUpdating, updateLivestockInfo } = useLivestockInfoUpdate(id);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(livestockInfoSchema) });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo({ ...info, [name]: value });
  };

  const handleFormSubmit = () => {
    if (isEdit) {
      const formData = new FormData();
      formData.append("uID", info?.uid);
      formData.append("name", info?.name);
      formData.append("gender", info?.gender);
      formData.append("breed", info?.breed);

      if (livestockImg) {
        formData.append("imageChanges", true);
        formData.append("liveStockImage", livestockImg);
      } else {
        formData.append("imageChanges", false);
      }

      updateLivestockInfo(formData, {
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

  useEffect(() => {
    if (livestockInfo) {
      setValue("uid", livestockInfo?.uID || "N/A");
      setValue("name", livestockInfo?.name || "N/A");
      setValue("gender", livestockInfo?.gender || "N/A");

      setInfo({
        uid: livestockInfo?.uID,
        name: livestockInfo?.name,
        gender: livestockInfo?.gender,
        breed: livestockInfo?.breed,
      });
    }
  }, [infoLoading]);

  const getImgUrl = (str) => {
    if (str?.toString()?.length) {
      const img = str?.toString()?.split("://");
      return "http://" + img[1];
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} style={{ width: "100%" }}>
      <Stack
        width="100%"
        direction={"column"}
        gap={1}
        sx={{ background: "#F7F8FD", p: 2, borderRadius: "10px" }}
      >
        <TabPane
          text="Livestock Information"
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
        {isEdit ? (
          <Box>
            <ImageUpload
              onUpload={setLivestockImg}
              onCancel={() => setLivestockImg(null)}
            />
          </Box>
        ) : (
          <img
            style={{
              height: "22vh",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={
              livestockInfo?.imgPath ||
              getImgUrl(livestockInfo?.imgPath) ||
              LivestockCoverPhoto
            }
            alt="livestock image"
          />
        )}
        <Stack direction={"column"} gap={2} mt={2}>
          <CustomTextField
            disabled={!isEdit}
            name="uid"
            label={"livestock UID"}
            value={info?.uid}
            onInputChange={handleChange}
            register={register}
            errors={errors}
          />
          <CustomTextField
            disabled={!isEdit}
            name="name"
            label={"livestock name"}
            value={info?.name}
            onInputChange={handleChange}
            register={register}
            errors={errors}
          />
          <CustomInput
            disabled={!isEdit}
            removePadding={true}
            name="gender"
            label={"Gender"}
            select={true}
            selectData={[
              { label: "Male", value: "male" },
              { label: "Female", value: "female" },
            ]}
            value={info?.gender}
            onChange={handleChange}
            register={register}
            errors={errors}
          />
          <CustomTextField
            disabled={!isEdit}
            label={"Breed"}
            value={info?.breed}
            onInputChange={handleChange}
            name="breed"
          />
        </Stack>
      </Stack>
    </form>
  );
};

export default LiveStockInfoEdit;
