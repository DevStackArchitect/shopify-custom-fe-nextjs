import styles from "@/styles/PrivacyPolicy.module.scss";
import Container from "@/components/Shared/Container";
import WhiteCard from "@/components/Shared/WhiteCard";

const PrivacyPolicy = () => {
  return (
      <div className={styles.wrapper}>
        <Container>
          <h1>Privacy Policy</h1>
          <p>
            This website values the privacy of its users and is committed to protecting it. The privacy policy outlines how we handle the information we collect from users and the measures we take to protect it. This policy applies to all users of the website.
          </p>

          <div className={styles.cardGrid}>
            <div className={styles.cardContent}>
              <h2>Information Collection</h2>
              <ul>
                <li>
                  <strong>Contact Information: </strong>
                  We collect generic contact details for communication purposes.
                </li>
                <li>
                  <strong>Usage Data: </strong>
                  We collect data on how our website is accessed and used.
                </li>
                <li>
                  <strong>Technical Information: </strong>
                  This includes browser type, IP addresses, and other technical details.
                </li>
              </ul>
            </div>

            <div className={styles.cardContent}>
              <h2>How We Collect Information</h2>
              <ul>
                <li>
                  <strong>Directly from You: </strong>
                  Information you provide when using our services.
                </li>
                <li>
                  <strong>Automatically: </strong>
                  Through cookies and analytics tools.
                </li>
              </ul>
            </div>

            <div className={styles.cardContent}>
              <h2>Use of Information</h2>
              <ul>
                <li>
                  <strong>To Provide Services: </strong>
                  We use the information to deliver our services efficiently.
                </li>
                <li>
                  <strong>To Improve Our Website: </strong>
                  For enhancing user experience and service optimization.
                </li>
              </ul>
            </div>

            <div className={styles.cardContent}>
              <h2>Sharing Information</h2>
              <ul>
                <li>
                  <strong>With Service Providers: </strong>
                  We share information with companies that provide services on our behalf.
                </li>
                <li>
                  <strong>For Legal Reasons: </strong>
                  When required by law or to protect our rights.
                </li>
              </ul>
            </div>

            <div className={styles.cardContent}>
              <h2>Email Opt-Out</h2>
              <ul>
                <li>
                  You can opt out of marketing emails by following the unsubscribe instructions provided in the emails.
                </li>
              </ul>
            </div>

            <div className={styles.cardContent}>
              <h2>Contact</h2>
              <p>
                For questions or concerns regarding our privacy practices, please contact our support team.
              </p>
            </div>

            <div className={styles.cardContent}>
              <h2>Third-Party Sites</h2>
              <p>
                Our website may contain links to other sites. We are not responsible for the privacy practices of such other sites.
              </p>
            </div>

            <div className={styles.cardContent}>
              <h2>Policy Updates</h2>
              <p>
                We may update this privacy policy from time to time. All updates will be posted on this page.
              </p>
            </div>

            <div className={styles.cardContent}>
              <h2>Jurisdiction</h2>
              <p>
                Any disputes over privacy will be governed according to the jurisdiction in which our company operates.
              </p>
            </div>
          </div>
        </Container>
      </div>
  );
};

export default PrivacyPolicy;
