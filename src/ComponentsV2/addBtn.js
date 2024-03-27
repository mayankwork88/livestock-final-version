import { Stack } from "@mui/material";
import { AddCircleOutlineOutlinedIcon } from "../icons";
import { ButtonPrimary, TypographyPrimary } from "./themeComponents";
import Spinner from "./Spinner";

const AddBtn = ({ text1, text2, onClick, loading }) => {
  return (
    <Stack
      height={385}
      my={4}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: { lg: "25%", md: "40%", sm: "60%" },
        borderRadius: "10px",
      }}
    >
      <Stack
        direction={"column"}
        alignItems={"center"}
        sx={{
          p: 2,
          width: "100%",
          background: "#F7F8FD",
          borderRadius: "10px",
        }}
      >
        <AddCircleOutlineOutlinedIcon
          sx={{ fontSize: 150 }}
          onClick={onClick}
        />
        <ButtonPrimary
          disabled={loading}
          sx={{
            width: "100%",
            py: 1,
            fontSize: "1.5rem",
            display: "flex",
            justifyContent: "center",
            mt: 4.5,
          }}
          startIcon={
            loading ? <Spinner sx={{ mr: 1 }} size={20} color={"#fff"} /> : null
          }
          onClick={onClick}
        >
          Assign {text1}
        </ButtonPrimary>
      </Stack>
      <TypographyPrimary sx={{ textAlign: "center" }}>
        Assign this {text2} to available {text1}.
      </TypographyPrimary>
      <TypographyPrimary sx={{ textAlign: "center", m: 0 }}>
        Note : If no {text1} is available then go to {text1} management - Add
        new {text1}
      </TypographyPrimary>
    </Stack>
  );
};

export default AddBtn;
