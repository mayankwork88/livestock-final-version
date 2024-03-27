import { Box, Button, Stack } from "@mui/material";
import { TypographyPrimary, ButtonPrimary } from "./themeComponents";
import CustomDateRangePicker from "./dateRangePicker";

const TabPaneV2 = ({
  paneText,
  paneTextColor,
  isBtn,
  btnText,
  btnColor,
  datePicker,
  onBtnClick,
  selectedDate,
  setSelectedDate,
  onClearAll,
  clearBtn,
  btnDisabled,
}) => {
  const disabled = btnDisabled
    ? {
        cursor: "default",
        background: "rgba(0,0,0,0.4)",
        "&:hover": {
          background: "rgba(0,0,0,0.4)",
        },
      }
    : {};
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <TypographyPrimary
        sx={{
          textTransform: "capitalize",
          color: paneTextColor,
          fontSize: "1.8rem",
        }}
      >
        {paneText}
      </TypographyPrimary>
      <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
        {datePicker ? (
          <Stack
            direction="row"
            justifyContent="flex-end"
            height="37px"
            gap={1}
            width="100%"
            sx={{ position: "block", zIndex: 100 }}
          >
            <CustomDateRangePicker
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </Stack>
        ) : null}
        {!isBtn && (
          <ButtonPrimary
            sx={{
              fontSize: "1.2rem",
              padding: "7px 15px",
              color: btnColor,
              display: "flex",
              justifyContent: "center",
              ...disabled,
            }}
            onClick={onBtnClick}
          >
            {btnText}
          </ButtonPrimary>
        )}
        {clearBtn ? (
          <Button
            variant="outlined"
            sx={{
              fontSize: "1.2rem",
              padding: "5px 15px",
              fontWeight: "bold",
              width: 150,
              textTransform: "capitalize",
            }}
            onClick={onClearAll}
          >
            Clear All
          </Button>
        ) : null}
      </Box>
    </Stack>
  );
};

export default TabPaneV2;
