import * as yup from "yup";

const emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

export const registerSchema = yup.object({
  name: yup.string().trim().required("İsim zorunludur"),
  email: yup
    .string()
    .trim()
    .matches(emailPattern, "Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur"),
  password: yup
    .string()
    .min(7, "Şifre en az 7 karakter olmalıdır")
    .required("Şifre zorunludur"),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .matches(emailPattern, "Geçerli bir e-posta adresi girin")
    .required("E-posta zorunludur"),
  password: yup
    .string()
    .min(7, "Şifre en az 7 karakter olmalıdır")
    .required("Şifre zorunludur"),
});