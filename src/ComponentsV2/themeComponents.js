import {
  Button,
  styled,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

//COLOR THEME
const colors = {
  primary: "#B58B5D",
  white: "#fff",
};

//COMMON BUTTON STYLES
const commonBtnStyle = {
  fontSize: "1.5rem",
  fontWeight: "bold",
  margin: "5px 0",
  display: "flex",
  justifyContent: "left",
  textTransform: "capitalize",
  letterSpacing: "1px",
  "&:hover": {
    background: "#C6A580",
    color: "#fff",
  },
};
export const ButtonPrimary = styled(Button)({
  background: colors.primary,
  justifyContent: "left",
  color: colors.white,
  padding: "0 15px",
  ...commonBtnStyle,
});
export const ButtonPrimaryRound = styled(Button)({
  background: colors.primary,
  borderRadius: "200px",
  color: colors.white,
  ...commonBtnStyle,
});
export const ButtonOutlinedRound = styled(Button)({
  ...commonBtnStyle,
  borderRadius: "200px",
  border: `1px solid ${colors.primary}`,
  color: colors.primary,
  marginRight: "10px",
  "&:hover": {
    background: "#fff",
    borderColor: "#C6A580",
  },
});

export const LoadingBtn = styled(LoadingButton)({
  borderRadius: "200px",
  width: "80px",
  ...commonBtnStyle,
});

const btnGroupCss = {
  borderRadius: "500px",
  minWidth: "120px",
  display: "flex",
  fontSize: "1.2rem",
  justifyContent: "center",
  padding: "10px 0",
  background: colors.white,
  color: colors.primary,
  border: `1px solid ${colors.primary}`,
};
export const BtnLeftSideRound = styled(LoadingButton)((props) => ({
  ...commonBtnStyle,
  ...btnGroupCss,
  [props.theme.breakpoints.down("md")]: {
    minWidth: "90px",
  },
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
}));

export const BtnRightSideRound = styled(LoadingButton)((props) => ({
  ...commonBtnStyle,
  ...btnGroupCss,
  [props.theme.breakpoints.down("md")]: {
    minWidth: "90px",
  },
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
}));

export const BtnNoSideRound = styled(LoadingButton)((props) => ({
  ...commonBtnStyle,
  ...btnGroupCss,
  [props.theme.breakpoints.down("md")]: {
    minWidth: "90px",
  },
  borderRadius: 0,
}));

// COMMON TYPOGRAPHY STYLES
export const TypographyPrimary = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 600,
  margin: "15px 0",
});
export const TableTypography = styled(Typography)({
  fontSize: "1.5rem",
  fontWeight: 600,
});

export const TypographySecondary = styled(Typography)({
  fontWeight: "bold",
  color: "#8F8F8F",
  textTransform: "Capitalize",
});

export const TypographyWithBg = styled(Typography)({
  fontSize: "2.2rem",
  background: "#C6A580",
  color: "#fff",
  fontWeight: 600,
  padding: "10px 15px",
});

// SIDEBAR

export const SidebarComp = styled(Stack)({
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  height: "100vh",
  position: "fixed",
  top: 0,
  left: 0,
  width: "17%",
  paddingRight: "20px",
});

export const CustomAvatar = styled(Box)(({ theme }) => ({
  width: 32,
  height: 32,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  borderRadius: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "1.5rem",
}));


