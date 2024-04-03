import styles from "./styles.module.scss";
import Image from "next/image";
import Container from "@/components/Shared/Container";
const ProductOfferList = ({list}) => {

  return (
    <Container>
      <div className={styles.wrapper}>
        {list.map((item, key) => {
          return (
            <div className={styles.item} key={key}>
              <Image
                src={item?.image}
                alt={""}
                width={210}
                height={210}
              />
              <h5>{item.title}</h5>
              <p>
                  {item.subtitle}
              </p>
            </div>
          );
        })}
      </div>
    </Container>
  );
};
export default ProductOfferList;
