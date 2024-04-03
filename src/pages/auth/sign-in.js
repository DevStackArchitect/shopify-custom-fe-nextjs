import React, { useContext } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "@/styles/SignIn.module.scss";
import { customerAccessTokenCreate, getCustomerInfo } from "@/actions/Auth";
import { toast } from "react-hot-toast";
import { Context } from "@/actions/AppContext";

const LoginPage = () => {
  const router = useRouter();
  const { setUserDetails } = useContext(Context); // [2

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const response = await customerAccessTokenCreate(
        values.email,
        values.password,
      );
      const token = response?.customerAccessToken?.accessToken;
      if (token) {
        localStorage.setItem("AccessToken", token);
        const userResponse = await getCustomerInfo(token);
        setUserDetails(userResponse);
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
    },
  });

  return (
    <div className={styles.wrapper}>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <input
            type="email"
            placeholder="Email"
            {...formik.getFieldProps("email")}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className={styles.error}>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <input
            type="password"
            placeholder="Password"
            {...formik.getFieldProps("password")}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className={styles.error}>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
