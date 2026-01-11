import { FaQuestion } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useCompContext } from "../contexts/CompContext";

const CompareItem = ({ items, config, compareResult, itemId, compKey }) => {
  const { setItemsToCompare } = useCompContext();
  const item = items[itemId] || null;

  return (
    <div className="compare-item">
      {item?.id && (
        <IoClose
          className="compare-delete"
          color="white"
          fontSize={"2rem"}
          onClick={() => {
            setItemsToCompare((prev) => {
              const group = prev[compKey] || {};

              if (itemId === "item1") {
                return {
                  ...prev,
                  [compKey]: {
                    ...group,
                    item1: group.item2 || {},
                    item2: {},
                  },
                };
              }
              if (itemId === "item2") {
                return {
                  ...prev,
                  [compKey]: {
                    ...group,
                    item2: {},
                  },
                };
              }

              return prev;
            });
          }}
        />
      )}
      <div className="compare-card" style={{ marginTop: item?.id ? "0" : "40px" }}>
        <div className="compare-head">
          <h3>{item?.name || "Not Selected"}</h3>
          {item?.name ? (
            <img
              src={`/producer-logos/${item.name.split(" ")[0].toLowerCase().replace(".", "_")}.png`}
              alt={`${item.name.split(" ")[0]} logo`}
            />
          ) : (
            <FaQuestion />
          )}
        </div>
        <div className="compare-body">
          {Object.entries(config.specs(item)).map(([key, value]) => {
            if (!value || value.match(/undefined/)) {
              return <p>{`---`}</p>;
            } else {
              return (
                <p
                  style={
                    compareResult
                      ? {
                          backgroundColor:
                            value === compareResult[key] ? "rgba(20, 88, 29, 1)" : "transparent",
                          border:
                            value === compareResult[key]
                              ? "1px solid rgba(194, 194, 194, 1)"
                              : "1px solid rgb(75, 75, 75)",
                        }
                      : {}
                  }
                >
                  {value}
                </p>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default CompareItem;
