import classNames from "classnames";
import styles from "./index.less";
import { useCanvasByContext } from "../../store/hooks";

// todo: 拖拽 删除 改变层次关系
export function Cmp({ cmp, selected, index }) {
  const { style, value } = cmp;
  const canvas = useCanvasByContext();
  const handleSelected = () => {
    canvas.setSelectedCmpIndex(index);
  };
  const handleDragStart = (e) => {
    handleSelected(index);
    // 拖拽的开始位置
    const startX = e.pageX;
    const startY = e.pageY;
    e.dataTransfer.setData("text/plain", startX + "," + startY);
  };

  return (
    <div
      className={styles.main}
      draggable="true"
      onDragStart={(e) => handleDragStart(e)}
      onClick={() => handleSelected()}
    >
      {/* 组件本身 */}
      <div className={styles.cmp} style={style}>
        {value}
      </div>

      {/* 组件的功能，选中的样式 */}
      <div
        className={classNames(
          styles.editStyle,
          selected ? styles.selected : styles.unselected
        )}
        style={{
          top: style.top - 2,
          left: style.left - 2,
          width: style.width,
          height: style.height,
        }}
      ></div>
    </div>
  );
}
