import { useState } from "react";
import { useCompContext } from "../contexts/CompContext";
import { FaCheck, FaBalanceScale, FaCheckCircle } from "react-icons/fa";

const SpecsList = ({ data, add, config }) => {
  const { selectedComps, setSelectedComps, itemsToCompare, setItemsToCompare } = useCompContext();
  const key = config.configKey;
  const selected = selectedComps[key];
  const [amountOfModules, setAmountOfModules] = useState(1);
  const items = itemsToCompare[key];
  const handleClick = (comp) => {
    if (key === "ram") {
      setSelectedComps((prev) => ({ ...prev, [key]: { ...comp, amountOfModules } }));
    } else {
      setSelectedComps((prev) => ({ ...prev, [key]: comp }));
    }
  };
  return (
    <div className="specs-wrapper">
      {data.length > 0 ? (
        data.slice(0, add).map((comp, i) => {
          const producer = comp.name.split(" ")[0];
          return (
            <div className="specs" key={i}>
              <div className="spec-header">
                <div className="name">
                  <img
                    src={`/producer-logos/${producer.toLowerCase().replace(".", "_")}.png`}
                    alt={`${producer} logo`}
                  />
                  <h3>{comp.name}</h3>
                </div>
                <div className="compare-icon">
                  <FaBalanceScale
                    size={"2em"}
                    onClick={() => {
                      setItemsToCompare((prev) => {
                        const group = prev[key] || {};

                        return {
                          ...prev,
                          [key]: {
                            item1:
                              group.item1?.id && group.item2?.id
                                ? group.item2
                                : group.item1 || comp,
                            item2:
                              (group.item1?.id && group.item2?.id) || group.item1?.id ? comp : {},
                          },
                        };
                      });
                    }}
                  />
                  {items?.item1 &&
                    items?.item2 &&
                    (items?.item1.id === comp.id || items?.item2.id === comp.id) && (
                      <FaCheckCircle
                        style={{ transform: "translateY(-25%)", color: " rgba(21, 189, 21, 1)" }}
                      />
                    )}
                </div>

                <div>
                  {key === "ram" ? (
                    <select
                      value={amountOfModules}
                      onChange={(e) => setAmountOfModules(Number(e.target.value))}
                    >
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                    </select>
                  ) : (
                    <></>
                  )}
                </div>
                <button onClick={() => handleClick(comp)}>
                  {selected?.id === comp.id ? (
                    <>
                      <FaCheck color="rgba(21, 189, 21, 1)" /> Choosen
                    </>
                  ) : (
                    "Choose"
                  )}
                </button>
              </div>
              <div className="specs-list">
                {Object.entries(config.specs(comp)).map(([key, value]) => {
                  return <p key={key}>{`${key}: ${value}`}</p>;
                })}
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-results">No results 😞</p>
      )}
    </div>
  );
};

export default SpecsList;
