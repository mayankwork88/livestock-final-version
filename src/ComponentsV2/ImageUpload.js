import { useState } from "react";
import {
  AddCircleOutlineOutlinedIcon,
  DeleteOutlineOutlinedIcon,
} from "../icons";
import { Box, Stack, Button } from "@mui/material";

const ImageUpload = ({ onUpload, onCancel }) => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    onUpload(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setImageUrl(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        border: "1px solid #8F8F8F",
        minHeight: "22vh",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      {!imageUrl ? (
        <>
          <AddCircleOutlineOutlinedIcon
            sx={{ color: "#8F8F8F", fontSize: 150 }}
          />
          <input
            id="upload-image"
            accept="image/*"
            type="file"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              cursor: "pointer",
              opacity: 0,
            }}
            onChange={handleFileUpload}
          />
        </>
      ) : (
        <Stack direction="row-reverse" alignItems="flex-start" gap={2} p={2} sx={{boxSizing:'border-box'}}>
          <Button
            variant="contained"
            color="error"
            sx={{ width: 60 }}
            onClick={() => {
              setImageUrl(null);
              onCancel?.();
            }}
          >
            <DeleteOutlineOutlinedIcon sx={{ fontSize: 32 }} />
          </Button>
          <img
            style={{ height: 165, width:200, objectFit:'contain'}}
            src={imageUrl}
            alt="Uploaded Image"
            height="300"
          />
        </Stack>
      )}
    </Box>
  );
};

export default ImageUpload;
