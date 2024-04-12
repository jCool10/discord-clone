import axios, { AxiosInstance } from "axios";
import { auth } from "@clerk/nextjs";
import { getUserIdFromLocalStorage, setUserIdToLocalStorage } from "./auth";

class Http {
  instance: AxiosInstance;
  // private userId: string;

  constructor() {
    // this.userId = getUserIdFromLocalStorage() || "";
    this.instance = axios.create({
      baseURL: "http://localhost:5000",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        config.headers.authorization = "user_2dJiyKgw0WS146gJTjw23QWkpK3";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export { http };
