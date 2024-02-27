import { useContext } from "react";
import { CanvasContext } from "../Context";

export function useCanvasData() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvas();
}

export function useCanvasCmps() {
  const canvas = useContext(CanvasContext);
  return canvas.getCanvasCmps();
}

// 获取操作canvas数据的函数
export function useCanvasByContext() {
  const canvas = useContext(CanvasContext);

  return canvas;
}

// export function useSelectedCmp() {
//   const canvas = useContext(CanvasContext);
//   return canvas.getSelectedCmp();
// }
