import { useState, useEffect } from "react";
import { Stack, Box, TextField, MenuItem } from "@mui/material";
import { TabPane, ImageUpload, Spinner } from "../../../ComponentsV2";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addLivestockValidationSchema } from "../../../utils/validationSchema";
import { request } from "../../../apis/axios-utils";
import useLivestockContext from "../../../hooks/useLivestockContext";
import { genderData } from "../../Data";
import useFormattedImage from "../../../hooks/useFormatedImage";
import useErrorMessage from "../../../hooks/useErrorMessage";
import { LivestockCoverPhoto } from "../../../assets";
import toast from "react-hot-toast";

const LivestockInfo = ({ data, btnText, btnBgColor, onBtnClick, loading }) => {
  const { getLivestockImg } = useFormattedImage();
  const { getErrorMessage } = useErrorMessage();
  const { setLiveStockImage, liveStockImage } = useLivestockContext();

  const { openSnackbarAlert, setIsError, isError } = useLivestockContext();
  const [isEditLivestockInfo, setIsEditLivestockInfo] = useState(true);
  const [LivestockInfoEdit, setLivestockInfoEdit] = useState({
    collarUID: "",
    livestockUID: "",
    livestockName: "",
    livestockGender: "",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(addLivestockValidationSchema) });

  useEffect(() => {
    setLivestockInfoEdit({
      collarUID: data?.collar?.uID || data?.collarUid || "N/A",
      pedometerUID: data?.pedometer?.uID || "N/A",
      livestockUID: data?.Uid,
      livestockName: data?.name,
      livestockGender: data?.gender,
    });
    if (data) {
      setValue("collarUID", data?.collar?.uID || data?.collarUid || "N/A");
      setValue("pedometerUID", data?.pedometer?.uID || "N/A");
      setValue("livestockUID", data?.Uid || "");
      setValue("livestockName", data?.name || "");
      setValue("livestockGender", data?.gender || "");
    }
  }, [data]);

  const handleLivestockInfoEditChange = (e) => {
    const { name, value } = e.target;
    setLivestockInfoEdit({ ...LivestockInfoEdit, [name]: value });
  };

  const handelLivestockNewInfoSubmit = async () => {
    if (onBtnClick) {
      onBtnClick(data?.collarId, data?.livestockId);
    } else {
      setIsEditLivestockInfo(false);
      if (!isEditLivestockInfo) {
        const config = {
          headers: { "content-type": "multipart/form-data" },
        };
        const formData = new FormData();
        formData.append("id", data?.id);
        formData.append("uID", LivestockInfoEdit?.livestockUID);
        formData.append("name", LivestockInfoEdit?.livestockName);
        // formData.append("gender", LivestockInfoEdit?.livestockGender);
        if (liveStockImage) {
          formData.append("imageChanges", true);
          formData.append("liveStockImage", liveStockImage);
        } else {
          formData.append("imageChanges", false);
        }
        try {
          const res = await request({
            url: `/liveStock/update`,
            method: "POST",
            data: formData,
            config,
          });
          if (res?.status === 200) {
            toast.success("Livestock successfully updated!");
            setIsError({
              error: false,
              message: null,
            });
            setIsEditLivestockInfo(true);
            setTimeout(() => window.location.reload(), 500);
          } else if (res?.response?.data?.statusCode === 409) {
            setIsError({
              error: true,
              message: res?.response?.data?.message,
            });
          } else {
            throw new Error(getErrorMessage(res));
          }
        } catch (err) {
          setIsEditLivestockInfo(true);
          toast.error(err.message);
        }
      }
    }
  };

  const getTextFiled = (
    disable,
    label,
    name,
    value,
    onChange,
    select,
    selectData,
    isError
  ) => {
    return (
      <TextField
        sx={{ mr: 1 }}
        fullWidth
        disabled={disable}
        select={select}
        id={name}
        label={label}
        variant="outlined"
        size="large"
        value={value}
        name={name}
        {...register(name, { required: true })}
        onChange={onChange}
        error={errors?.[name] ? true : false || isError?.error}
        helperText={errors?.[name]?.message || isError?.message}
      >
        {select &&
          selectData?.map((option) => (
            <MenuItem key={option?.id} value={option?.value}>
              {option?.label}
            </MenuItem>
          ))}
      </TextField>
    );
  };

  const getImgUrl = (str) => {
    if (str?.toString()?.length) {
      const img = str?.toString()?.split("://");
      return "http://" + img[1];
    }
  };

  return (
    <form onSubmit={handleSubmit(handelLivestockNewInfoSubmit)}>
      <Stack
        sx={{
          background: "#F7F8FD",
          p: 2,
          pb: 4,
          borderRadius: "10px",
        }}
        gap={3}
      >
        <TabPane
          text="Livestock Information"
          loading={loading}
          btnText={btnText ? btnText : isEditLivestockInfo ? "Edit" : "Save"}
          btnIcon={
            loading ? <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} /> : null
          }
          hover={true}
          btnBgColor={btnBgColor}
          type="submit"
        />
        {isEditLivestockInfo ? (
          <img
            style={{
              height: "33vh",
              width: "100%",
              objectFit: "cover",
              borderRadius: "10px",
            }}
            src={data?.img || getImgUrl(data?.img) || LivestockCoverPhoto}
            alt="livestock image"
          />
        ) : (
          <ImageUpload
            onUpload={setLiveStockImage}
            onCancel={() => setLiveStockImage(null)}
          />
        )}
        <Stack direction="row" gap={2}>
          {getTextFiled(
            true,
            "Collar",
            "collarUID",
            LivestockInfoEdit?.collarUID,
            () => {}
          )}
          {getTextFiled(
            true,
            "Pedometer",
            "pedometerUID",
            LivestockInfoEdit?.pedometerUID,
            () => {}
          )}
        </Stack>
        <Stack direction="row" gap={2}>
          {getTextFiled(
            isEditLivestockInfo,
            "Livestock UID",
            "livestockUID",
            LivestockInfoEdit?.livestockUID,
            handleLivestockInfoEditChange,
            null,
            null,
            isError
          )}
          {getTextFiled(
            isEditLivestockInfo,
            "Livestock Name",
            "livestockName",
            LivestockInfoEdit?.livestockName,
            handleLivestockInfoEditChange
          )}
        </Stack>
      </Stack>
    </form>
  );
};

export default LivestockInfo;
