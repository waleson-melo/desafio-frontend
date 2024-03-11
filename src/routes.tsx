import { createBrowserRouter, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Compra from "./pages/Compra"
import { Login } from "./pages/Login"
import CriarConta from "./pages/CriarConta"
import { useEffect } from "react"
import MinhasCompras from "./pages/MinhasCompras"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: sessionStorage.getItem("cpf")
      ? Home
      : () => {
          const navigate = useNavigate()
          useEffect(() => {
            navigate("/login")
          }, [navigate])
          return Login()
        },
  },
  {
    path: "/comprar",
    Component: sessionStorage.getItem("cpf")
      ? Compra
      : () => {
          const navigate = useNavigate()
          useEffect(() => {
            navigate("/login")
          }, [navigate])
          return Login()
        },
  },
  {
    path: "/minhas-compras",
    Component: sessionStorage.getItem("cpf")
      ? MinhasCompras
      : () => {
          const navigate = useNavigate()
          useEffect(() => {
            navigate("/login")
          }, [navigate])
          return Login()
        },
  },
  {
    path: "/criar-conta",
    Component: !sessionStorage.getItem("cpf")
      ? CriarConta
      : () => {
          const navigate = useNavigate()
          useEffect(() => {
            navigate("/")
          }, [navigate])
          return Home()
        },
  },
  {
    path: "/login",
    Component: !sessionStorage.getItem("cpf")
      ? Login
      : () => {
          const navigate = useNavigate()
          useEffect(() => {
            navigate("/")
          }, [navigate])
          return Home()
        },
  },
])
