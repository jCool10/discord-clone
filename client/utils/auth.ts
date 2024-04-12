export const setUserIdToLocalStorage = (userId: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("userId", userId);
  }
};

export const getUserIdFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userId") || "";
  }
};
