import { useCanvasByContext } from "@/store/hooks";
import styles from "./index.less";

const defaultStyle = {
  position: "absolute",
  top: 1,
  left: 0,
  width: 80,
  height: 80,
  backgroundColor: "#ffffff00",
  textAlign: "left",
  borderRadius: "0%",
  borderStyle: "none",
  borderWidth: "0",
  borderColor: "#ffffff00",
  zIndex: 0,
};

const settings = [
  {
    value: "https://img.tukuppt.com/bg_grid/00/06/94/9UtwsWQS7x.jpg!/fh/350",
    style: defaultStyle,
  },
  {
    value:
      "https://img-qn.51miz.com/preview/muban/00/00/64/23/M-642310-39C5FDE9.jpg!/quality/90/unsharp/true/compress/true/fw/300",
    style: defaultStyle,
  },
];

export default function ImgDetail({ type = "text" }) {
  const canvas = useCanvasByContext();
  const addCmp = (_cmp) => {
    canvas.addCmp(_cmp);
  };
  return (
    <div className={styles.main}>
      <ul className={styles.box}>
        {settings.map((item) => (
          <li
            key={item.value}
            className={styles.item}
            onClick={() => addCmp({ ...item, nodeType: type })}
          >
            <img src={item.value} alt="" draggable="false" />
          </li>
        ))}
      </ul>
    </div>
  );
}
