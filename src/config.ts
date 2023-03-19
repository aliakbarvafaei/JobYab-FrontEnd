import axios from "axios";

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    window.location.hostname === "[::1]" ||
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

const API_URL = 
  isLocalhost
    ? "http://localhost:8000/api/v1"
    : 
  "https://api.erfan-nourbakhsh.ir/api/v1";

export const axiosInstance = axios.create({
  // withCredentials: true,
  baseURL: API_URL,
});

export const configToken =()=> {return {
  headers: {
    Authorization: `Token ${JSON.parse(localStorage.getItem("token_user") as string)}`,
  },
}};
