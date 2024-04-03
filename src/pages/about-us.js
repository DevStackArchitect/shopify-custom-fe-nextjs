import styles from "@/styles/PrivacyPolicy.module.scss";
import Container from "@/components/Shared/Container";
import ContactUs from "@/pages/contact-us";

const AboutUs = () => {
  return (
    <div className={styles.wrapper}>
      <Container>
        <h1>About Us</h1>


      </Container>
      <ContactUs bgNone/>
    </div>
  );
};

export default AboutUs;
