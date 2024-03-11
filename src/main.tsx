import React from "react"
import ReactDOM from "react-dom/client"
import "@/global.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { Toaster } from "./components/ui/toaster"
import { RouterProvider } from "react-router-dom"
import { router } from "./routes"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <Toaster />
  </React.StrictMode>
)
