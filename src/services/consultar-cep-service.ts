import { viacep } from "@/api/api"
import useAxios from "@/api/use-axios"

export async function getEnderecoByCep(cep: string) {
  try {
    const response = await useAxios({
      axiosInstance: viacep,
      method: "get",
      url: `/${cep}/json`,
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      if (response.data.erro) {
        throw new Error("Cep não encontrado")
      }
      return response.data
    } else {
      throw new Error("Erro ao obter informações do cep da API")
    }
  } catch (error) {
    console.error("Erro ao obter cep:", error)
    throw error
  }
}
