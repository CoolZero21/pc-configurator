import { TbLoader2 } from "react-icons/tb";

function Loading() {
  const loadingStyle = {
    color: "rgb(255, 255, 255)",
    fontSize: "3.125rem",
    animation: "1200ms ease-in-out 0s infinite spiner",
  };
  return (
    <div className="loading" style={{ display: "flex", justifyContent: "center" }}>
      <TbLoader2 style={loadingStyle} />
    </div>
  );
}
export default Loading;
