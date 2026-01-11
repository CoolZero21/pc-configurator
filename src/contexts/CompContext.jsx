import { createContext, useContext, useEffect, useState } from "react";
import { loadSelectedComps, saveSelectedComps } from "../utils/localStorage";
const CompContext = createContext(null);
import { compMap } from "../config/componentConfig";

export function CompProvider({ children }) {
  const [selectedComps, setSelectedComps] = useState({
    mobo: null,
    cpu: null,
    ram: null,
    gpu: null,
    psu: null,
  });

  const [itemsToCompare, setItemsToCompare] = useState({});

  const [conflicts, addDependenciesConflicts] = useState({});

  useEffect(() => {
    const conflicts = {};
    Object.keys(selectedComps).forEach((selectedKey) => {
      if (!selectedComps[selectedKey]) return;
      const componentConfig = compMap[selectedKey];
      if (!componentConfig || !componentConfig.dependencies) return;

      Object.entries(componentConfig.dependencies).forEach(([targetkey, func]) => {
        const checkResult = func(selectedComps[selectedKey], selectedComps[targetkey]);

        if (!conflicts[targetkey]) {
          conflicts[targetkey] = [];
        }

        conflicts[targetkey] = [...conflicts[targetkey], ...checkResult];
      });
    });

    addDependenciesConflicts(conflicts);
  }, [selectedComps]);

  useEffect(() => {
    const savedConfig = loadSelectedComps();
    if (savedConfig) setSelectedComps(savedConfig);
  }, []);

  useEffect(() => {
    saveSelectedComps(selectedComps);
  }, [selectedComps]);

  const [menuId, setMenuId] = useState(0);
  const [showFullMenu, setShowFullMenu] = useState(true);

  return (
    <CompContext.Provider
      value={{
        selectedComps,
        setSelectedComps,
        menuId,
        setMenuId,
        showFullMenu,
        setShowFullMenu,
        conflicts,
        addDependenciesConflicts,
        itemsToCompare,
        setItemsToCompare,
      }}
    >
      {children}
    </CompContext.Provider>
  );
}

export function useCompContext() {
  return useContext(CompContext);
}
