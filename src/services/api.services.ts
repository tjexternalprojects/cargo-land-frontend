import axios from "axios";
import TokenServices from "./token.services";
const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = `Bearer ${TokenServices.getAccessToken()}`;
    console.log(token, "tokeen");
    if (token) {
      config.headers["authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a new interceptor to handle FormData objects with images
instance.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  async (err) => {
    console.log(err);
    const originalConfig = err.config;
    console.log(originalConfig);
    if (
      (originalConfig.url !== "/user/login" ||
        originalConfig.url !== "/user/register") &&
      err.response
    ) {
      // Access Token was expired
      if (
        err.response.status === 401 &&
        err.response.Error == "token expired" &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/user/regenerate-access-token", {
            refreshToken: TokenServices.getRefreshToken(),
          });

          const { accessToken } = rs.data;
          TokenServices.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
