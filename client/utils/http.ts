import axios, { AxiosInstance } from "axios";
// import { getUserId } from "./auth";

axios.defaults.withCredentials = true;

class Http {
  instance: AxiosInstance;
  userId: string;

  constructor() {
    this.userId = "";
    this.instance = axios.create({
      baseURL: "http://localhost:5000",
      withCredentials: true,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
        // config.headers.Authorization = this.userId;
        config.withCredentials = true;
        config.headers.Authorization = "user_2dJiyKgw0WS146gJTjw23QWkpK3";
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
