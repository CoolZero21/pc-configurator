import { IoIosCloseCircleOutline } from "react-icons/io";
import { useCompContext } from "../contexts/CompContext";

import CompareItem from "./CompareItem";
import { compMap } from "../config/componentConfig";

const Compare = ({ id, isOpen, func }) => {
  const { itemsToCompare } = useCompContext();
  const items = itemsToCompare[id] || {};
  const config = compMap[id];

  const compareResult =
    items?.item1?.id && items?.item2?.id ? config?.comparision?.(items?.item1, items?.item2) : null;

  return (
    <div className="compare-container" style={{ display: isOpen ? "flex" : "none" }}>
      <IoIosCloseCircleOutline
        size={"2.5em"}
        onClick={() => func(false)}
        style={{ alignSelf: "flex-end" }}
      />
      <div className="compare">
        <div className="compare-specs-names">
          {Object.entries(config.specs()).map(([key, value]) => {
            return <p>{key}</p>;
          })}
        </div>
        <CompareItem
          items={items}
          itemId={"item1"}
          compareResult={compareResult}
          config={config}
          compKey={id}
        />
        <CompareItem
          items={items}
          itemId={"item2"}
          compareResult={compareResult}
          config={config}
          compKey={id}
        />
      </div>
    </div>
  );
};
export default Compare;
