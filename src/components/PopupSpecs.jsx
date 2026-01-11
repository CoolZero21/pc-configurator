import { Html } from "@react-three/drei";
import { useCompContext } from "../contexts/CompContext";
import { compMap } from "../config/componentConfig";

const PopupSpecs = ({ position, compKey, name }) => {
  const { showFullMenu, selectedComps, conflicts } = useCompContext();
  const config = compMap[compKey];
  const selectedComp = selectedComps[config.configKey];

  let selected;
  let compName;
  if (selectedComp) {
    selected = config.specs(selectedComp);
    compName = config.name(selectedComp);
  } else {
    selected = null;
    compName = "None";
  }
  const messages = conflicts[compKey] || [];

  return (
    <Html transform sprite position={position} scale={!showFullMenu ? [1, 1, 1] : [0, 0, 0]}>
      {selected && (
        <div className="comp-card">
          <p className="header-popup">{`${name}: ${compName}`}</p>
          <div className="specs-popup">
            {Object.entries(selected).map(([key, value]) => {
              if (compKey === "ram" && key === "Size") {
                return (
                  <p key={`${key}-${value}`} className="spec-popup">{`${key}: ${
                    Number(value.match(/\d+/)) * selectedComp?.amountOfModules
                  } GB`}</p>
                );
              } else {
                return <p key={`${key}-${value}`} className="spec-popup">{`${key}: ${value}`}</p>;
              }
            })}
          </div>
          <div className="warnings">
            {messages.map((mssg) => {
              return <p>{mssg}</p>;
            })}
          </div>
        </div>
      )}
    </Html>
  );
};
export default PopupSpecs;
