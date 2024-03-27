import * as Yup from "yup";

// REGULAR EXPRESSIONS
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const uppercaseRegExp = /(?=.*?[A-Z])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const isValid =
  uppercaseRegExp && lowercaseRegExp && digitsRegExp && specialCharRegExp;
const whiteSpace =
  /^(?!\s+$).*/ ||
  /^(?!\s+$)/ ||
  /^\s*\S.*$/ ||
  /^\s*\S[^]*$/ ||
  /^\s*\S[\s\S]*$/;

//COMMON VALIDATIONS
const emailValidation = Yup.string()
  .required()
  .email()
  .matches(whiteSpace, "Cant'\t be white spaces only");
const phoneValidation = Yup.string()
  .required()
  .matches(phoneRegExp, "Phone number is not valid");
const createPassword = Yup.string()
  .required("No password provided.")
  .min(8, "password must contain at least 8 characters")
  .matches(
    isValid,
    "Contain at least one uppercase, lowercase, number and special character"
  );

//PROFILE PAGE VALIDATION SCHEMA

//PROFILE PAGE USER SECURITY SCHEMA
export const securityProfileSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("No password provided")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  newPassword: createPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});

//PROFILE PAGE USER DETAIL SCHEMA
export const showProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  phoneNumber: phoneValidation,
  email: emailValidation,
  address: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  pincode: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  // state:Yup.string().required().matches(whiteSpace, "Cant'\t be white spaces only"),
  // country:Yup.string().required().matches(whiteSpace, "Cant'\t be white spaces only")
});

// RESEt Password
export const forgetPasswordSchema = Yup.object().shape({
  email: emailValidation,
});

// NEW PASSWORD
export const resetPassword = Yup.object().shape({
  newPassword: createPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});
// LOGIN SCHEMA
export const loginSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string()
    .required("No password provided")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});

// SIGN UP SCHEMA
export const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  email: emailValidation,
  password: createPassword,
  phone: phoneValidation,
});

// ADD COLLAR VALIDATION SCHEMA
export const addCollarValidationSchema = Yup.object().shape({
  collarUID: Yup.string()
    .required()
    .min(3, "UID must be long")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  collarName: Yup.string()
    .required()
    .min(3, "Name must be long")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  collarMacId: Yup.string()
    .required()
    .min(8, "UID must 8 digit long")
    .max(8, "UID must 8 digit long")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});

export const addLivestockValidationSchema = Yup.object()
  .shape({
    collarUID: Yup.string(),
    pedometerUID: Yup.string(),
    livestockUID: Yup.string().required().min(3, "Livestock UID must be long"),
    livestockName: Yup.string()
      .required()
      .min(3, "Livestock Name must be long"),
    livestockGender: Yup.string().required(),
  })
  .test(
    "one-is-selected",
    "At least one device must be selected",
    (values) => values.collarUID || values.pedometerUID
  );

export const livestockInfoSchema = Yup.object().shape({
  uid: Yup.string().required().min(3, "Livestock UID must be long"),
  name: Yup.string().required().min(3, "Livestock name must be long"),
  gender: Yup.string().required("Gender is required"),
});

export const livestockBirthDetails = Yup.object().shape({
  dob: Yup.string().required("DOB is required"),
});

export const milkEntrySchema = Yup.object().shape({
  entryQuantity: Yup.string().required("Quantity is required"),
});

export const aiAttemptSchema = Yup.object().shape({
  aiAttemptNo: Yup.string().required("Attempt Name is required"),
  sireNo: Yup.string().required("Sire No. is required"),
});

export const calfSchema = Yup.object().shape({
  name: Yup.string()
    .required()
    .min(3, "Name must be long")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  uID: Yup.string()
    .required()
    .min(3, "UID must be long")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  gender: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  birthWeight: Yup.string()
    .required("Birth Weight Is A Required Field")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  sireNo: Yup.string()
    .required("Sire No. Is A Required Field")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  genoType: Yup.string()
    .required("Genotype Is A Required Field")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  color: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  calvingType: Yup.string()
    .required("Calving Time Is A Required Field")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});
