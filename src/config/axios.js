import axios from "axios";
import useRefreshToken from "../hooks/useRefreshToken";

const BASE_URL = "http://localhost:8080/api";
const refresh = useRefreshToken()

export const authApi = axios.create({
  baseURL: `${BASE_URL}/auth`,
  headers:{
    "Content-Type": "application/json"
  }
})

authApi.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error)
  }
)

export const userApi = axios.create({
  baseURL: `${BASE_URL}/user`,
  headers:{
    "Content-Type": "application/json"
  }
})

userApi.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken){
      config.headers["x-access-token"] = accessToken;
    }
    return config
  },
  (error) => {
    return Promise.reject(error);
  }
)

userApi.interceptors.response.use(
  response => {
    return response.data
  },
  async(error) => {
    const origReq = error?.config
    if(error?.response?.status === 401 && !origReq?.sent){
      origReq.sent = true
      const newAccessToken = await refresh()
      origReq.headers["x-access-token"] = newAccessToken
      return userApi(origReq)
    }
    return Promise.reject(error)
  }
)
