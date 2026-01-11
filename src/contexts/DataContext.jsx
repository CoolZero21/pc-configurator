import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext(null);

export function DataProvider({ children }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function load() {
      const [cpus, gpus, mobos, psus, rams] = await Promise.all([
        fetch("/database/CPU.json").then((r) => r.json()),
        fetch("/database/GPU.json").then((r) => r.json()),
        fetch("/database/MOBO.json").then((r) => r.json()),
        fetch("/database/PSU.json").then((r) => r.json()),
        fetch("/database/RAM.json").then((r) => r.json()),
      ]);
      setData({ cpus, gpus, mobos, psus, rams });
    }
    load();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}
