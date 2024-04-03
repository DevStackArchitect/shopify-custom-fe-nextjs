import styles from "./styles.module.scss";
import Link from "next/link";
const Breadcrumb = ({ list }) => {
  return (
    <div className={styles.wrapper}>
      {list.map((item, key) => {
        return (
          <>
            {key !== 0 && <div className={styles.divider} key={key}></div>}
            {item.href ? (
              <Link href={item?.href} key={"a" + key}>
                {item.name}
              </Link>
            ) : (
              <a  key={key}  > {item.name}</a>
            )}
          </>
        );
      })}
    </div>
  );
};
export default Breadcrumb;
