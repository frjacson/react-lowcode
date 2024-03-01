import { useRef } from "react";
import { getOnlyKey } from "../utils";

const defaultCanvas = {
  // 页面背景
  style: {
    width: 320,
    height: 568,
    backgroundColor: "#ffffff",
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    boxSizing: "content-box",
  },
  // 组件
  cmps: [],
};

class Canvas {
  constructor(canvas = defaultCanvas) {
    this.canvas = canvas; // 页面数据
    this.selectedCmpIndex = null; // 被选中的下标
    this.listeners = [];
  }

  getCanvas = () => {
    return { ...this.canvas };
  };

  getCanvasCmps = () => {
    return [...this.canvas.cmps];
  };

  setCanvas = (canvas) => {
    Object.assign(this.canvas, canvas);
  };

  getSelectedCmpIndex = () => {
    return this.selectedCmpIndex;
  };

  getSelectedCmp = () => {
    return this.canvas.cmps[this.selectedCmpIndex];
  };

  setSelectedCmpIndex = (index) => {
    if (this.selectedCmpIndex === index) {
      return;
    }
    this.updateZIndex(index); // 清除zIndex的目的是让选中的组件放在上面
    this.selectedCmpIndex = index;
    // 如果第一次选中，需要增加边框，所以需要重新更新app样式
    this.updateApp();
  };

  addCmp = (cmp) => {
    const _cmp = { key: getOnlyKey(), ...cmp };
    this.canvas.cmps.push(_cmp);
    // 更新下标
    this.selectedCmpIndex = this.canvas.cmps.length - 1;
    // this.setSelectedCmpIndex(this.canvas.cmps.length - 1); // 新增元素，重新设置下标

    // 更新组件
    this.updateApp();
  };

  updateZIndex = (id) => {
    this.canvas.cmps.forEach((item, index) => {
      if (id === index) {
        Object.assign(item, {
          style: { ...item.style, zIndex: 1 },
        });
      } else {
        Object.assign(item, {
          style: { ...item.style, zIndex: 0 },
        });
      }
    });
  };

  updateSelectedCmp = (newStyle = {}, newValue = {}) => {
    const selectedCmp = this.getSelectedCmp();

    Object.assign(this.canvas.cmps[this.getSelectedCmpIndex()], {
      style: { ...selectedCmp.style, ...newStyle, zIndex: 1 },
      // newValue的修改
    });
    this.updateApp();
  };

  updateCanvasStyle = (newStyle = {}) => {
    this.canvas.style = {
      ...this.canvas.style,
      ...newStyle,
    };
    this.updateApp();
  };

  updateApp = () => {
    // 希望组件更新
    this.listeners.forEach((lis) => lis());
  };

  subscribe = (listener) => {
    this.listeners.push(listener);
    // 取消订阅
    return () => {
      this.listeners.filter((lis) => lis !== listener);
    };
  };

  getPublicCanvas = () => {
    const obj = {
      getCanvas: this.getCanvas,
      getCanvasCmps: this.getCanvasCmps,
      getSelectedCmpIndex: this.getSelectedCmpIndex,
      setSelectedCmpIndex: this.setSelectedCmpIndex,
      updateSelectedCmp: this.updateSelectedCmp,
      updateCanvasStyle: this.updateCanvasStyle,
      getSelectedCmp: this.getSelectedCmp,
      addCmp: this.addCmp,
      subscribe: this.subscribe,
    };

    return obj;
  };
}

export function useCanvas(canvas) {
  const canvasRef = useRef();

  if (!canvasRef.current) {
    if (canvas) {
      canvasRef.current = canvas;
    } else {
      canvasRef.current = new Canvas().getPublicCanvas();
    }
  }
  return canvasRef.current;
}
