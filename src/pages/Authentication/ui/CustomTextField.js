import { TextField, InputAdornment } from "@mui/material";
import { VisibilityOutlinedIcon, VisibilityOffIcon } from "../../../icons";

const CustomTextField = ({
  placeholder,
  disabled,
  name,
  select,
  label,
  value,
  type,
  onInputChange,
  showPassword,
  setShowPassword,
  register,
  errors,
  variant,
}) => {
  return (
    <TextField
      sx={{
        background: "#fff",
        textTransform: "capitalize",
        borderRadius: "8px",
      }}
      disabled={disabled}
      fullWidth
      id={name}
      select={select}
      label={label}
      variant={variant || "outlined"}
      size="large"
      value={value}
      name={name}
      type={
        name?.toLowerCase()?.includes("password") && !showPassword
          ? "password"
          : type || "text"
      }
      placeholder={placeholder}
      InputProps={{
        sx: { fontSize: variant?.toLowerCase() === "filled" ? "14px" : '' },
        endAdornment: name?.toLowerCase()?.includes("password") ? (
          <InputAdornment
            position="end"
            onClick={() => setShowPassword(!showPassword)}
          >
            {!showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffIcon />}
          </InputAdornment>
        ) : null,
      }}
      {...register?.(name, { required: true })}
      onChange={onInputChange}
      error={errors?.[name] ? true : false}
      helperText={errors?.[name]?.message}
    />
  );
};

export default CustomTextField;
