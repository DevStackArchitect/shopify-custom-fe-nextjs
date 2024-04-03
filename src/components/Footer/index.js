import styles from "./styles.module.scss";
import Container from "@/components/Shared/Container";
import Image from "next/image";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <Container>
        <div className={styles.list}>
          <div className={styles.cpdetails}>
            <Image
                src={"https://placehold.co/150x30"}
              alt={" "}
              width={150}
              height={100}
              className={styles.logo}
            />

          </div>
          <div className={styles.quickLinks}>
            <div className={styles.tittle}>Quick Links</div>
            <ul>
              <li>
                <Link href={"/privacy-policy"}>Privacy Policy</Link>
              </li>
              <li>
                <Link href={"/refund-policy"}>Refund Policy</Link>
              </li>
              <li>
                <Link href={"/shipping-policy"}>Shipping Policy</Link>
              </li>
              <li>
                <Link href={"/terms-of-service"}>Terms of Service</Link>
              </li>
              <li>
                <Link href={"/contact-us"}>Contact us</Link>
              </li>
              <li>
                <Link href={"/faq"}>FAQ</Link>
              </li>
              <li>
                <Link href={"/cancellation-policy"}>Cancellation Policy</Link>
              </li>
              <li>
                <a>My account</a>
              </li>
            </ul>
          </div>
          <div className={styles.program}>
            <div className={styles.tittle}>Programs</div>
            <ul>
              <li>
                <Link href={"/about-us"}>About us</Link>
              </li>
              <li>
                <Link
                  href={""}
                  target={"_blank"}
                >
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link href={"/wishlist"}>Wishlist</Link>
              </li>
              <li>
                <Link href={"/"}>Rewards</Link>
              </li>
              <li>
                <Link href={"/app/ecoreturns"}>Return & Exchanges</Link>
              </li>
              <li>
                <Link href={"/bulk-order"}>Bulk Orders</Link>
              </li>
            </ul>
          </div>

          <div className={styles.subscribe}>
            <div className={styles.tittle}>
              Subscribe today for updates on new products and offers.
            </div>
            <div className={styles.subContainer}>
              <input type="text" placeholder={"Enter your email"} />
              <button>Subscribe </button>
            </div>
            <ul className={styles.social}>
              <li>
                <Link
                  href=""
                  target={"_blank"}
                >
                  <Image
                    src={"/images/insta.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="" target={"_blank"}>
                  <Image
                    src={"/images/fb.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="" target={"_blank"}>
                  <Image
                    src={"/images/yt.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="" target={"_blank"}>
                  <Image
                    src={"/images/twitter.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="" target={"_blank"}>
                  <Image
                    src={"/images/pin.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
              <li>
                <Link href="" target={"_blank"}>
                  <Image
                    src={"/images/link.svg"}
                    alt={""}
                    width={24}
                    height={24}
                  />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};
export default Footer;
