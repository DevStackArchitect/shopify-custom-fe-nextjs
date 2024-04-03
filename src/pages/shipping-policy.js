import styles from "@/styles/ShippingPolicy.module.scss";
import Container from "@/components/Shared/Container";
import WhiteCard from "@/components/Shared/WhiteCard";

const ShippingPolicy = () => {
  return (
      <div className={styles.wrapper}>
        <Container>
          <div className={styles.content}>
            <h1>Our Shipping Framework</h1>
            <h4>
              Our commitment is to deliver excellence in shipping services to our customers worldwide. We strive to ensure timely delivery across all regions, maintaining high service standards.
            </h4>

            <WhiteCard>
              <div className={styles.cardContent}>
                <h2>Order Handling</h2>
                <p>
                  Orders undergo a thorough verification, quality check, and packaging process before shipment. Generally, orders are dispatched within 2 business days after being placed.
                </p>

                <h5>Delivery Timeline</h5>
                <ul>
                  <li>
                    Delivery duration varies based on the destination. Typically, orders are delivered within 3 to 7 business days post-dispatch. Please note, delivery times may extend due to unforeseen circumstances like weather conditions or regional holidays.
                  </li>
                </ul>
                <h5>Delivery Fees</h5>
                <ul>
                  <li>
                    Delivery charges apply to all orders. For standard delivery, a fee of $5 is charged, whereas express delivery incurs a fee of $10. For any delivery-related inquiries, please reach out to our customer support at support@example.com or call our helpline.
                  </li>
                </ul>
              </div>
            </WhiteCard>
          </div>
        </Container>
      </div>
  );
};

export default ShippingPolicy;
