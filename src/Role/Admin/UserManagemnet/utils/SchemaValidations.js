import * as Yup from "yup";

const whiteSpace =
  /^(?!\s+$).*/ ||
  /^(?!\s+$)/ ||
  /^\s*\S.*$/ ||
  /^\s*\S[^]*$/ ||
  /^\s*\S[\s\S]*$/;
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const phoneValidation = Yup.string().matches(
  phoneRegExp,
  "Phone number is not valid"
);

const emailValidation = Yup.string()
  .required()
  .email()
  .matches(whiteSpace, "Email cant'\t be white spaces only");

const username = Yup.string()
  .required()
  .matches(whiteSpace, "Username Cant'\t be white spaces only")
  .min(3, "Username must have at least 3 characters");

export const userSchema = Yup.object().shape({
  username: username,
  email: emailValidation,
  mobile: Yup.string(),
});

// .when("mobile", {
//   is: (value) => !!value,
//   then: Yup.string().matches(phoneRegExp, "Phone number must be 10 digits"),
// }),
