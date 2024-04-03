import styles from "./styles.module.scss";
import Image from "next/image";
import Container from "@/components/Shared/Container";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import { isMobile } from "react-device-detect";
const HeroBanner = ({ data }) => {
  if (!data) return null;
  return (
    <div className={styles.wrapper}>
      <Container>
        <div className={styles.bread}>
          <Breadcrumb
            list={[
              { href: "/", name: "Home" },
              { href: "/", name: "Collection" },
              { name: data?.title },
            ]}
          />
        </div>
      </Container>
    </div>
  );
};
export default HeroBanner;
