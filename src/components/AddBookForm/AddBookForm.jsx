import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { addBookSchema } from "../../utils/addBookSchema";
import { addBook } from "../../api/books";
import css from "./AddBookForm.module.css";

const AddBookForm = ({ onAdded }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addBookSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values) => {
    try {
      const newBook = await addBook(values);
      toast.success("Kitap kütüphanene eklendi");
      reset();
      onAdded?.(newBook);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Kitap eklenirken hata oluştu"
      );
    }
  };

  return (
    <form id="add-book-form" className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className={css.label}>Create your library:</p>

      <div className={css.field}>
        <input
          type="text"
          placeholder="Book title"
          className={css.input}
          {...register("title")}
        />
        {errors.title && <p className={css.error}>{errors.title.message}</p>}
      </div>

      <div className={css.field}>
        <input
          type="text"
          placeholder="The author"
          className={css.input}
          {...register("author")}
        />
        {errors.author && (
          <p className={css.error}>{errors.author.message}</p>
        )}
      </div>

      <div className={css.field}>
        <input
          type="number"
          placeholder="Number of pages"
          className={css.input}
          {...register("totalPages")}
        />
        {errors.totalPages && (
          <p className={css.error}>{errors.totalPages.message}</p>
        )}
      </div>

      <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
        Add book
      </button>
    </form>
  );
};

export default AddBookForm;
