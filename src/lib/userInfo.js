"use client";
export const setUser = (userData) => {
  localStorage.setItem("user", JSON.stringify(userData));
};

export const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};
