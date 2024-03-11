import api from "@/api/api"
import useAxios from "@/api/use-axios"

export async function getSaldoByCPF(cpf: string) {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "get",
      url: `/credito/cpf/${cpf}`,
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      return response.data
    } else {
      throw new Error("Erro ao obter saldo da API")
    }
  } catch (error) {
    console.error("Erro ao obter saldo:", error)
    throw error
  }
}
