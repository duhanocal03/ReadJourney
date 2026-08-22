import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { loginSchema } from "../../utils/validationSchemas";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext/AuthContext";
import authBanner from "../../assets/Auth-Banner.png";
import logo from "../../assets/Logo.svg";
import css from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onTouched",
  });

  const onSubmit = async (formValues) => {
    try {
      const data = await loginUser(formValues);
      await login(data);
      navigate("/recommended");
    } catch (error) {
      const message =
        error?.response?.data?.message || "Giriş sırasında bir hata oluştu";
      toast.error(message);
    }
  };

  return (
    <div className={css.page}>
      <div className={css.left}>
        <img src={logo} alt="Read Journey" className={css.logo} />

        <div className={css.content}>
          <h1 className={css.title}>
            Expand your mind, reading <span className={css.accent}>a book</span>
          </h1>

          <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className={css.field}>
              <input
                type="email"
                placeholder="Mail"
                className={css.input}
                {...register("email")}
              />
              {errors.email && (
                <p className={css.error}>{errors.email.message}</p>
              )}
            </div>

            <div className={css.field}>
              <div className={css.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={css.input}
                  {...register("password")}
                />
                <button
                  type="button"
                  className={css.eyeBtn}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              {errors.password && (
                <p className={css.error}>{errors.password.message}</p>
              )}
            </div>

            <div className={css.actions}>
              <button type="submit" className={css.submitBtn} disabled={isSubmitting}>
                Log In
              </button>
              <Link to="/register" className={css.switchLink}>
                Don&apos;t have an account?
              </Link>
            </div>
          </form>
        </div>
      </div>

      <div className={css.right}>
        <img src={authBanner} alt="" className={css.banner} />
      </div>
    </div>
  );
};

export default Login;