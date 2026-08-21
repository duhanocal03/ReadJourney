import * as yup from "yup";

export const addBookSchema = yup.object({
  title: yup.string().trim().required("Kitap adı zorunludur"),
  author: yup.string().trim().required("Yazar adı zorunludur"),
  totalPages: yup
    .number()
    .typeError("Sayfa sayısı gereklidir")
    .positive("Sayfa sayısı pozitif olmalıdır")
    .integer("Tam sayı olmalıdır")
    .required("Sayfa sayısı zorunludur"),
});
