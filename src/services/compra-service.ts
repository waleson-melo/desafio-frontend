import { getClienteByCPF } from "./cliente-service"
import { CreateVendaDTO } from "@/entities/DTOs/create-venda-dto"
import useAxios from "@/api/use-axios"
import api from "@/api/api"

export async function createVenda(data: CreateVendaDTO) {
  const cliente = await getClienteByCPF(data.cpf)

  if (cliente) {
    const venda = {
      cliente: cliente.id,
      produto: data.produto,
      quantidade: data.quantidade,
      valor: data.valor,
      parcelas: data.parcelas,
    }

    try {
      const response = await useAxios({
        axiosInstance: api,
        method: "POST",
        url: `/venda`,
        otherConfigs: venda,
      })
      console.log(response)
      if (response.status === 201) {
        return response.data
      } else {
        let errorMessage = "Erro ao realizar venda"
        throw new Error(errorMessage)
      }
    } catch (error: any) {
      throw error
    }
  }
}
