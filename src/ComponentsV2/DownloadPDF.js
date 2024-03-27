import React, { useRef } from "react";
import { request } from "../apis/axios-utils";
import generatePDF from "react-to-pdf";

const DownloadPDF = ({ children }) => {
  const targetRef = useRef();
  const downloadPDF = () => {
    request({
      url: "/liveStock/getLivestockInfoData?livestockId=65bcc9d2bb410e6092104a26",
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "file.pdf");
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  };

  return (
    <div>
      <button onClick={() => generatePDF(targetRef, { filename: "page.pdf" })}>
        Download PDF
      </button>
      <div ref={targetRef}>{children}</div>
    </div>
  );
};

export default DownloadPDF;
