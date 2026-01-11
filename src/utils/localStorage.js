export const saveSelectedComps = (config) => {
  try {
    localStorage.setItem("pc-selected", JSON.stringify(config));
  } catch (error) {
    console.error(`An unexpected error occurred, while saving the configuration ${error}`);
  }
};

export const loadSelectedComps = () => {
  try {
    const data = localStorage.getItem("pc-selected");
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`An unexpected error occurred, while loading the configuration ${error}`);
  }
};
