import { useEffect, useReducer } from "react";
import styles from "./App.less";
import { CanvasContext } from "./Context";
import { Center } from "./layout/Center";
import { Header } from "./layout/Header";
import { Left } from "./layout/Left";
import { Right } from "./layout/Right";
import { useCanvas } from "./store/canvas";

function App() {
  const canvas = useCanvas();
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  useEffect(() => {
    const unsubscribe = canvas.subscribe(() => {
      forceUpdate();
    });
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.main}>
      <CanvasContext.Provider value={canvas}>
        <Header />
        <div className={styles.content}>
          <Left />
          <Center />
          <Right />
        </div>
      </CanvasContext.Provider>
    </div>
  );
}

export default App;
