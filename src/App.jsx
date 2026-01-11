import Background from "./components/Background";
import Computer from "./components/Computer";
import Menu from "./components/Menu";
import { MdSave } from "react-icons/md";
import { useState, useRef } from "react";
import { useCompContext } from "./contexts/CompContext";
import { toJpeg } from "html-to-image";

function App() {
  const [started, setStarted] = useState(false);
  const { showFullMenu } = useCompContext();

  const divRef = useRef(null);

  const saveImg = async () => {
    if (!divRef) return;
    try {
    } catch (e) {
      console.error(`An unexpected error occurred, while saving the image ${e}`);
    }
    const dataURL = await toJpeg(divRef.current, {
      quality: 0.95,
      backgroundColor: "grey",
      filter: (node) => node.className !== "save-icon" && node.className !== "menu-wrapper",
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "PC.jpeg";
    link.click();
  };

  return (
    <div className="wrapper" ref={divRef}>
      <div className="main-wrapper">
        <Computer started={started} />
        {started ? (
          <Menu />
        ) : (
          <div className="start">
            <button onClick={() => setStarted(true)}>BUILD</button>
          </div>
        )}
      </div>
      <Background />
      {!showFullMenu && (
        <div onClick={saveImg} className="save-icon">
          <MdSave />
        </div>
      )}
    </div>
  );
}

export default App;
