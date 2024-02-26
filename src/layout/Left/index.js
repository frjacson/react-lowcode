import { useState } from "react";
import DetailsList from "../../components/DetailsList";
import styles from "./index.less";

export function Left(props) {
  const [showSide, setShowSize] = useState(false);
  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li className={styles.cmp} onClick={() => setShowSize(!showSide)}>
          <span>文本</span>
        </li>
      </ul>

      {showSide && <DetailsList />}
    </div>
  );
}
