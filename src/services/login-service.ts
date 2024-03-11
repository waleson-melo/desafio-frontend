import api from "@/api/api"
import useAxios from "@/api/use-axios"

export async function login(data: any) {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "post",
      url: `/login`,
      otherConfigs: { cpf: data.cpf, senha: data.senha },
    })

    if (response.status === 200 && response.data) {
      return response.data
    } else {
      throw new Error("Erro ao logar da API")
    }
  } catch (error) {
    console.error("Erro ao logar:", error)
    throw error
  }
}
