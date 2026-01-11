import { IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import DataList from "./DataList";
import { useCompContext } from "../contexts/CompContext";

const MenuSection = ({ name, id, isPicked, onToggle }) => {
  const [add, setAdd] = useState(5);
  const { selectedComps } = useCompContext();
  const comp = selectedComps[id];

  const handleClick = () => {
    onToggle(id);
  };

  return (
    <>
      <div className="menu-section" onClick={handleClick}>
        <div className="menu-section-heading">
          <IoIosArrowDown
            color="white"
            size={"35px"}
            style={{ transform: isPicked ? "scaleY(-1)" : "scaleY(1)" }}
          />
          <h2>{name}</h2>
        </div>
        <h3>
          {comp !== null && id === "ram" && `${comp?.amountOfModules} x `}
          {comp?.name}
        </h3>
      </div>
      {isPicked && (
        <div className="open-section">
          <DataList name={name} add={add} id={id} />
          <button onClick={() => setAdd(add + 10)}>More ...</button>
        </div>
      )}
    </>
  );
};
export default MenuSection;
