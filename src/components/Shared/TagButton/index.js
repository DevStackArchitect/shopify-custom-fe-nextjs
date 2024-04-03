import styles from "./styles.module.scss";
const TagButton = ({ tag, onClick, active }) => {
  return (
    <div
      className={`${styles.ctaTag} ${active && styles.active}`}
      onClick={onClick}
    >
      {tag}
    </div>
  );
};
export default TagButton;
