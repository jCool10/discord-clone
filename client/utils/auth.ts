export const setUserIdToLocalStorage = (userId: string) => {
  if (typeof window !== "undefined") {
    console.log(123123);

    localStorage.setItem("userId", userId);
  }
};

export const getUserIdFromLocalStorage = () => {
  console.log(typeof window);
  if (typeof window !== "undefined") {
    console.log("setUserIdToLocalStorage");
    return localStorage.getItem("userId") || "";
  }
};
