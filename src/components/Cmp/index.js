import classNames from "classnames";
import styles from "./index.less";
import { useCanvasByContext } from "../../store/hooks";

// todo: 拖拽 删除 改变层次关系
export function Cmp({ cmp, selected, index, type }) {
  const { style, value } = cmp;
  const { width, height } = style;
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

  const handleMouseDown = (e) => {
    let direction = e.target.dataset.direction;
    if (!direction) return;
    console.log(direction);

    e.stopPropagation();
    e.preventDefault();

    let startX = e.pageX;
    let startY = e.pageY;

    const handleMouseMove = (e) => {
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;

      let newStyle = {};

      //todo top left
      if (direction) {
        if (direction.indexOf("top") !== -1) {
          // 如果移动了上面的按钮
          disY = 0 - disY;
          newStyle.top = style.top - disY;
        }
        if (direction.indexOf("left") !== -1) {
          disX = 0 - disX;
          newStyle.left = style.left - disX;
        }
      }

      Object.assign(newStyle, {
        width: style.width + disX,
        height: style.height + disY,
      });
      canvas.updateSelectedCmp(newStyle);
    };

    const handleMouseUp = (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove, false);
    document.addEventListener("mouseup", handleMouseUp, false);
  };

  const generateNodeByType = (value) => {
    if (type === "text") {
      return value;
    } else if (type === "img") {
      return <img src={value} alt="" />;
    } else {
      return null;
    }
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
        {generateNodeByType(value)}
      </div>

      {/* 组件的功能，选中的样式 */}
      <ul
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
        onMouseDown={handleMouseDown}
      >
        <li
          className={styles.stretchDot}
          style={{ top: -8, left: -8 }}
          data-direction="top, left"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: -8,
            left: width / 2 - 8,
          }}
          data-direction="top"
        />

        <li
          className={styles.stretchDot}
          style={{ top: -8, left: width - 8 }}
          data-direction="top right"
        />

        <li
          className={styles.stretchDot}
          style={{ top: height / 2 - 8, left: width - 8 }}
          data-direction="right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: width - 8,
          }}
          data-direction="bottom right"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: width / 2 - 8,
          }}
          data-direction="bottom"
        />

        <li
          className={styles.stretchDot}
          style={{
            top: height - 8,
            left: -8,
          }}
          data-direction="bottom left"
        />
        <li
          className={styles.stretchDot}
          style={{
            top: height / 2 - 8,
            left: -8,
          }}
          data-direction="left"
        />
      </ul>
    </div>
  );
}
