export const setUser = (userData) => {
  if (typeof window !== "undefined")
    localStorage.setItem("user", JSON.stringify(userData));
};

export const getUser = () => {
  if (typeof window !== "undefined")
    return JSON.parse(localStorage.getItem("user"));
  else return {};
};
