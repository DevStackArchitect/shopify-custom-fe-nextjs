import styles from "./styles.module.scss";
import Image from "next/image";
import Container from "@/components/Shared/Container";
const WhatsappBanner = () => {
  return (
    <Container>
      <div className={styles.wrapper}>
          <div>
              <div className={styles.heading}>Planning a bulk order?</div>
              <div className={styles.subHeading}>Reach out to us via WhatsApp!</div>
          </div>
        <Image
          src={"/images/whatsapp.gif"}
          alt={"whatapp"}
          width={100}
          height={100}
        />
      </div>
    </Container>
  );
};
export default WhatsappBanner;
