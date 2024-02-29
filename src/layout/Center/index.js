import { useCanvasByContext } from "../../store/hooks";
import { Cmp } from "../../components/Cmp";
import styles from "./index.less";
import { useCallback } from "react";

export function Center(props) {
  const canvas = useCanvasByContext();
  const canvasData = canvas.getCanvas();
  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      const endX = e.pageX;
      const endY = e.pageY;

      const start = e.dataTransfer.getData("text/plain").split(",");
      const diffX = endX - start[0];
      const diffY = endY - start[1];
      const selectedCmp = canvas.getSelectedCmp();
      const oldStyle = selectedCmp.style;
      const top = oldStyle.top + diffY;
      const left = oldStyle.left + diffX;

      canvas.updateSelectedCmp({ top, left });
    },
    [canvas]
  );

  const allowDrop = (e) => {
    e.preventDefault();
  };

  const selectedIndex = canvas.getSelectedCmpIndex();

  const { style, cmps } = canvasData;
  return (
    <div className={styles.main}>
      <div
        className={styles.canvas}
        onDrop={onDrop}
        onDragOver={(e) => allowDrop(e)}
      >
        {cmps.map((cmp, index) => (
          <Cmp
            key={cmp.key}
            cmp={cmp}
            selected={selectedIndex === index}
            index={index}
            type={cmp.nodeType}
          />
        ))}
      </div>
    </div>
  );
}
