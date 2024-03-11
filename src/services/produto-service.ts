import api from "@/api/api"
import useAxios from "@/api/use-axios"
import { Produto } from "@/entities/produto"

export async function getProdutos() {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "get",
      url: "/produtos",
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      const produtos: Produto[] = response.data.map((produtoData: any) => {
        return new Produto(produtoData)
      })

      return produtos
    } else {
      throw new Error("Erro ao obter produtos da API")
    }
  } catch (error) {
    console.error("Erro ao obter produtos:", error)
    throw error
  }
}

export async function getProdutoById(id: string) {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "get",
      url: `/produtos/${id}`,
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      return new Produto(response.data)
    } else {
      throw new Error("Erro ao obter produto da API")
    }
  } catch (error) {
    console.error("Erro ao obter produto:", error)
    throw error
  }
}
