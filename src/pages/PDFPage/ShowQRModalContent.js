import { Button, Stack } from "@mui/material";
import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { TypographyPrimary } from "../../ComponentsV2/themeComponents";

const ShowQRModalContent = ({ id, title }) => {
  const qrRef = useRef();

  const downloadQRCode = () => {
    // getting a svg element
    const svgElement = qrRef?.current;

    // convert the element into SVG content as a string
    const svgContent = new XMLSerializer().serializeToString(svgElement);

    // convert the SVG content into a Blob url
    const svgBlob = new Blob([svgContent], { type: "image/svg+xml" });

    // to download the img, convert the SVG img to a PNG img before downloading

    // Create a new Image element
    const img = new Image();

    // Set up onload event handler to render SVG onto the Image element
    img.onload = function () {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to match the image dimensions
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Convert canvas content to a PNG image
      canvas.toBlob(function (blob) {
        // Create a download link for the PNG image
        const downloadLink = document.createElement("a");
        const imageUrl = URL.createObjectURL(blob);
        downloadLink.href = imageUrl;
        downloadLink.download = "QRCode.png";

        // Append the download link to the document body and trigger the download
        document.body.appendChild(downloadLink);
        downloadLink.click();

        // Clean up
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(imageUrl);
      }, "image/png");
    };
    // Set the src attribute of the Image element to the SVG image data URL
    img.src = URL.createObjectURL(svgBlob);
  };

  return id ? (
    <Stack
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      p={2}
    >
      {title && (
        <TypographyPrimary
          sx={{ mb: 0.3, fontSize: "2.5rem", textTransform: "capitalize" }}
        >
          {title} QR
        </TypographyPrimary>
      )}
      <QRCode
        value={`${window.location.origin}/getLivestockHistory/${id}`}
        ref={qrRef}
      />
      {title && (
        <Button
          sx={{ fontSize: "1.5rem" }}
          variant="contained"
          onClick={downloadQRCode}
        >
          download
        </Button>
      )}
    </Stack>
  ) : (
    <Stack direction={"row"} alignItems={"center"}>
      <TypographyPrimary sx={{ mx: 2 }}>No {title} Found!!</TypographyPrimary>
    </Stack>
  );
};
export default ShowQRModalContent;
