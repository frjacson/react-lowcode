import { useCanvasByContext } from "@/store/hooks";
import InputColor from "react-input-color";
import styles from "./index.less";

export function EditCanvas() {
  const canvas = useCanvasByContext();
  const style = canvas.getCanvas().style;

  const handleStyleChange = (e, { name, value }) => {
    canvas.updateCanvasStyle({ [name]: value });
  };
  return (
    <div className={styles.main}>
      <div className={styles.title}>画布属性</div>
      <EditItem label="画布宽度">
        <input
          type="number"
          value={style.width}
          onChange={(e) =>
            handleStyleChange(e, { name: "width", value: e.target.value - "0" })
          }
        />
      </EditItem>

      <EditItem label="画布高度">
        <input
          type="number"
          value={style.height}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "height",
              value: e.target.value - "0",
            })
          }
        />
      </EditItem>

      <EditItem label="背景颜色">
        <InputColor
          className={styles.itemRight}
          initialValue={style.backgroundColor}
          onChange={(e) =>
            handleStyleChange(e, { name: "backgroundColor", value: e.hex })
          }
          placement="right"
        />
      </EditItem>

      <EditItem label="背景图片">
        <input
          type="text"
          value={style.backgroundImage}
          onChange={(e) =>
            handleStyleChange(e, {
              name: "backgroundImage",
              value: e.target.value,
            })
          }
        />
      </EditItem>
    </div>
  );
}

function EditItem({ label, children }) {
  return (
    <div className={styles.item}>
      <label>{label}</label>
      {children}
    </div>
  );
}
