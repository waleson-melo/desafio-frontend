import api from "@/api/api"
import useAxios from "@/api/use-axios"
import { CreateClientDTO } from "@/entities/DTOs/create-cliente-dto"
import { Cliente } from "@/entities/cliente"

export async function getClienteByCPF(cpf: string) {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "get",
      url: `/clientes/cpf/${cpf}`,
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      return new Cliente(response.data)
    } else {
      throw new Error("Erro ao obter cliente da API")
    }
  } catch (error) {
    console.error("Erro ao obter cliente:", error)
    throw error
  }
}

export async function createCliente(cliente: CreateClientDTO) {
  console.log(cliente)
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "post",
      url: "/clientes",
      otherConfigs: cliente,
    })

    if (response.status === 201) {
      return new Cliente(response.data)
    } else {
      throw new Error("Erro ao criar cliente na API")
    }
  } catch (error: any) {
    throw error.data
  }
}
