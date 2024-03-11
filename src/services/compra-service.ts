import { getClienteByCPF } from "./cliente-service"
import { CreateVendaDTO } from "@/entities/DTOs/create-venda-dto"
import useAxios from "@/api/use-axios"
import api from "@/api/api"
import { GetComprasDTO } from "@/entities/DTOs/get-compras-dto"

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

export async function getComprasByCPF(cpf: string) {
  try {
    const response = await useAxios({
      axiosInstance: api,
      method: "get",
      url: `/venda/cpf/${cpf}`,
      otherConfigs: {},
    })

    if (response.status === 200 && response.data) {
      const compras: [] = response.data.map((vendaData: any) => {
        return new GetComprasDTO(vendaData)
      })
      return compras
    } else {
      throw new Error("Erro ao obter cliente da API")
    }
  } catch (error) {
    console.error("Erro ao obter cliente:", error)
    throw error
  }
}
