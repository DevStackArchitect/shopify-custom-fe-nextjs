import styles from "./styles.module.scss";
const Divider =({addedStyles}) => {
    return (
        <div className={`${styles.wrapper} ${addedStyles}`}></div>
    )
}
export default Divider;