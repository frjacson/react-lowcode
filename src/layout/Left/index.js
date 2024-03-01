import { useState } from "react";
import TextDetail from "@/components/TextDetail";
import ImgDetail from "@/components/ImgDetail";
import styles from "./index.less";

export const listData = [
  {
    type: "text",
    component: <TextDetail type="text" />,
    content: "文本",
    id: 1,
  },
  {
    type: "img",
    component: <ImgDetail type="img" />,
    content: "图片",
    id: 2,
  },
];
export function Left(props) {
  const [showSide, setShowSide] = useState(false);
  const [showId, setShowId] = useState(0);

  const handleSideClick = (id) => {
    console.log(showId, id);
    if (showId === id) {
      setShowSide(!showSide);
    } else {
      setShowSide(true);
      setShowId(id);
    }
  };
  // 生成侧边栏函数
  const generateSide = () => {
    if (showSide && showId !== 0) {
      return listData[showId - 1].component;
    } else {
      return null;
    }
  };
  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        {listData.map((item, index) => {
          return (
            <li
              key={item.id}
              className={styles.cmp}
              onClick={() => handleSideClick(index + 1)}
            >
              <span>{item.content}</span>
            </li>
          );
        })}
      </ul>
      {/* 渲染侧边栏 */}
      {generateSide()}
    </div>
  );
}
