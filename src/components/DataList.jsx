import { useRef, useState } from "react";
import { useData } from "../contexts/DataContext";
import SpecsList from "./SpecsList";
import Loading from "./Loading";
import { useCompContext } from "../contexts/CompContext";
import { compMap } from "../config/componentConfig";
import Compare from "./Compare";
import { IoIosArrowDown } from "react-icons/io";

const DataList = ({ name, add, id }) => {
  const data = useData();
  if (!data) return <Loading />;
  const config = compMap[id];
  const comp = data[config.dataKey];
  const [compData, setCompData] = useState(comp);
  const { selectedComps, setSelectedComps, set } = useCompContext();
  const selected = selectedComps[config.configKey];
  let selectedData;
  if (selected !== null) {
    selectedData = [selected, ...compData.filter((comp) => comp.id !== selected.id)];
  } else {
    selectedData = [...compData];
  }

  const inputRef = useRef(null);
  const handleSearch = (e, comp) => {
    const searchValue = e.target.value.toLowerCase();
    comp = comp.filter((comp) => comp.name.toLowerCase().includes(searchValue));
    setCompData(comp);
  };

  const [activeFilters, setActiveFilters] = useState({});

  const handleCheckbox = (filterName, value) => {
    setActiveFilters((prev) => {
      const selected = prev[filterName] || [];

      if (selected.includes(value)) {
        return {
          ...prev,
          [filterName]: selected.filter((v) => v !== value),
        };
      } else {
        return {
          ...prev,
          [filterName]: [...selected, value],
        };
      }
    });
  };
  const applyFilters = (list) => {
    let result = list;

    Object.entries(activeFilters).forEach(([filterName, selectedValues]) => {
      if (selectedValues.length > 0) {
        result = result.filter((item) => selectedValues.includes(item[filterName]));
      }
    });

    return result;
  };

  const [compareMenuOpen, setCompareMenuOpen] = useState(false);

  return (
    <>
      <div className="compare-menu-toggle" onClick={() => setCompareMenuOpen(!compareMenuOpen)}>
        Compare{" "}
        <IoIosArrowDown style={{ transform: compareMenuOpen ? "scaleY(1)" : "scaleY(-1)" }} />
      </div>
      <Compare id={id} isOpen={compareMenuOpen} func={setCompareMenuOpen} />
      <div className="searchfield">
        <input
          type="text"
          onChange={(e) => handleSearch(e, comp)}
          id="searchfield"
          placeholder={`Search ${name}...`}
          ref={inputRef}
        />
      </div>
      <div className="filters">
        {config.filters.checkbox.map((check, i) => {
          const filterName = Object.keys(check)[0];
          const filterConfig = Object.values(check)[0];
          const values =
            typeof filterConfig.values === "function"
              ? filterConfig.values(comp)
              : filterConfig.values;
          return (
            <div className="filter-container" key={i}>
              <h3>{filterName}:</h3>
              <div className="filter-options">
                {values.map((value, i) => {
                  return (
                    <div key={value}>
                      <input
                        type="checkbox"
                        id={`${value}-${i}`}
                        checked={activeFilters[filterConfig.key]?.includes(value) || false}
                        onChange={() => handleCheckbox(filterConfig.key, value)}
                      />
                      <label htmlFor={`${value}-${i}`}>{value}</label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="clear-btn"
        onClick={() => {
          setActiveFilters({});
          inputRef.current.value = "";
          setCompData(comp);
        }}
      >
        Clear Filters
      </button>
      <button
        className="clear-btn"
        onClick={() => {
          setSelectedComps((prev) => ({ ...prev, [config.configKey]: null }));
        }}
      >
        Clear Component
      </button>
      <SpecsList data={applyFilters(selectedData)} add={add} config={config} />
    </>
  );
};

export default DataList;
