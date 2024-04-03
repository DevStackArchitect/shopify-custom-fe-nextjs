import styles from "./styles.module.scss";
const Row = ({ children, addedStyles }) => {
  return (
    <div className={`${styles.wrapper} ${addedStyles ? addedStyles : ""}`}>
      {children}
    </div>
  );
};
export default Row;