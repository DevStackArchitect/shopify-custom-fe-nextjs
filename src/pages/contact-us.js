import styles from "@/styles/ContactUs.module.scss";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import {useFormik} from "formik";
import * as Yup from "yup";
import Link from "next/link";

const ContactUs = ({bgNone}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      contactNumber: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      contactNumber: Yup.string()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, "Must be at least 10 digits")
        .required("Contact number is required"),
      message: Yup.string().required("Message is required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
    },
  });

  return (
    <div className={`${styles.wrapper} ${bgNone && styles.noBackground}`}>
      <Container>
        <div className={styles.card}>
          <h2>Get in Touch</h2>
          <h5>
            Connect with us for inquiries, support, or any assistance you may
            need.
          </h5>
          <div className={styles.formContainer}>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <input
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Name"
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div>{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className={styles.formGroup}>
                  <input
                      type="email"
                      name="email"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                      placeholder="Email Address"
                  />
                  {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className={styles.formGroup}>
                  <input
                      type="text"
                      name="contactNumber"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.contactNumber}
                      placeholder="Contact Number"
                  />
                  {formik.touched.contactNumber &&
                  formik.errors.contactNumber ? (
                      <div>{formik.errors.contactNumber}</div>
                  ) : null}
                </div>
              </div>
              <textarea
                name="message"
                rows={5}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                placeholder="Type your message here .."
              />
              {formik.touched.message && formik.errors.message ? (
                <div>{formik.errors.message}</div>
              ) : null}
              <div className={styles.ctaContainer}>
                <div className={styles.dis}>
                  This site is protected by reCAPTCHA and the Google &nbsp;
                  <Link href={"/privacy-policy"}>Privacy Policy</Link> and &nbsp;
                  <Link href={'/terms-of-service'}>Terms of Service</Link> apply.
                </div>
                <button type="submit">Send</button>
              </div>
            </form>
            <Image
              src={"https://placehold.co/400"}
              alt={"contact us"}
              width={326}
              height={328}
              className={styles.sideImage}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
export default ContactUs;
