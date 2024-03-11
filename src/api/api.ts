import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL as string,
})

const viacep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
})

export default api
export { viacep }
