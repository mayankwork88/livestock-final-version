import React, { useState } from "react";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import { AddCircleOutlineIcon, QrCode2Icon } from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";
import ExportAsCSV from "./ExportAsCSV";
import { toast } from "react-hot-toast";

const TabPane = ({
  text,
  btnText,
  btnIcon,
  onBtnClick,
  btnBgColor,
  type,
  secondaryText,
  btnColor,
  hover,
  loading,
  search,
  onSearch,
  minWidth,
  selectValue,
  selectOptions,
  onSelectChange,
  exportable,
  csvFormate,
  maxWidth,
  showQR,handleQRClick
}) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    let val = e.target?.value;
    setQuery(val);
    onSearch?.(val);
  };

  const handleEmpty = () => {
    toast.error("Nothing to export");
  };

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Box p={1} pl={0}>
        <TypographyPrimary
          sx={{ fontSize: "2rem", textTransform: "capitalize", m: 0 }}
        >
          {text}
        </TypographyPrimary>
        {secondaryText && (
          <TypographyPrimary sx={{ textTransform: "capitalize", m: 0 }}>
            {secondaryText}
          </TypographyPrimary>
        )}
      </Box>
      <Box
        display="flex"
        justifyContent={"flex-end"}
        alignItems={"center"}
        gap={2}
      >
        {search && (
          <TextField
            fullWidth
            variant="outlined"
            size="large"
            sx={{ mr: 1, minWidth: "18rem" }}
            value={query}
            InputProps={{
              sx: { height: "5vh" },
            }}
            onChange={handleSearch}
            placeholder={`Search by name...`}
          />
        )}

        {selectValue ? (
          <TextField
            fullWidth
            select
            sx={{ minWidth: "10rem" }}
            InputProps={{
              sx: { height: "5vh" },
            }}
            value={selectValue}
            onChange={(e) => onSelectChange(e.target.value)}
          >
            {selectOptions?.map((ele) => (
              <MenuItem value={ele?.value}>{ele?.label}</MenuItem>
            ))}
          </TextField>
        ) : null}

        {showQR && (
          <QrCode2Icon sx={{ fontSize: "48px" }} onClick={handleQRClick} />
        )}

        {btnText ? (
          <ButtonPrimary
            disabled={loading}
            sx={{
              background: btnBgColor ? btnBgColor : "#B58B5D",
              p: "8px 15px",
              color: `${btnColor ? btnColor : "#fff"}`,
              cursor: `${!hover ? "default" : "pointer"}`,
              display: "flex",
              justifyContent: "center",
              minWidth: `${minWidth || "auto"}`,
              maxWidth: `${maxWidth || "auto"}`,
              "&:hover": { backgroundColor: !hover ? btnBgColor : "" },
            }}
            onClick={onBtnClick}
            type={type}
            startIcon={
              btnIcon
                ? btnIcon || <AddCircleOutlineIcon fontSize="large" />
                : null
            }
          >
            {btnText}
          </ButtonPrimary>
        ) : null}
        {exportable && (
          <ButtonPrimary
            sx={{
              background: btnBgColor ? btnBgColor : "#B58B5D",
              p: "8px 10px",
              color: `${btnColor ? btnColor : "#fff"}`,
              cursor: `${!hover ? "default" : "pointer"}`,
              display: "flex",
              justifyContent: "center",
              width: "120px !important",
              "&:hover": { backgroundColor: !hover ? btnBgColor : "" },
            }}
            onClick={() =>
              csvFormate?.headers?.length && csvFormate?.data?.length
                ? null
                : handleEmpty()
            }
          >
            {csvFormate?.headers?.length && csvFormate?.data?.length ? (
              <ExportAsCSV
                headers={csvFormate?.headers || []}
                data={csvFormate?.data || []}
                fileName={csvFormate?.name || "data-as-csv"}
              >
                Export
              </ExportAsCSV>
            ) : (
              "Export"
            )}
          </ButtonPrimary>
        )}
      </Box>
    </Stack>
  );
};

export default TabPane;
