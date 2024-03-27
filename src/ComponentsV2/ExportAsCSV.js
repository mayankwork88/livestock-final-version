import React from "react";
import { CSVLink } from "react-csv";

const ExportAsCSV = ({ children, headers, data, fileName }) => {
  const exportHeaders = (data) => {
    const res = data
      ?.map((ele) => ({
        label: ele,
        key: ele
          .split(" ")
          .map((ele, ind) => {
            if (ind === 0) return ele.toLocaleLowerCase();
            else
              return ele.charAt(0).toUpperCase() + ele.slice(1).toLowerCase();
          })
          .join(""),
      }))
      .filter(
        (ele) =>
          ele.label?.toLowerCase() !== "action" &&
          ele.label?.toLowerCase() !== "actions"
      );

    return res;
  };

  const exportData = (data) => {
    const res = data?.map((ele) => {
      delete ele?.action;
      return ele;
    });
    return res;
  };
  return (
    <div>
      <CSVLink
        data={exportData(data)}
        headers={exportHeaders(headers)}
        filename={fileName}
        target="_blank"
        style={{ color: "white", textDecoration: "none" }}
      >
        {children}
      </CSVLink>
    </div>
  );
};

export default ExportAsCSV;
