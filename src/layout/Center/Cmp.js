import styles from "./index.less";
export function Cmp({ cmp }) {
  const { style, value } = cmp;
  return (
    <div className={styles.cmp} style={style}>
      {value}
    </div>
  );
}
