import { Produto } from "@/entities/produto"
import InputQuantidade from "../input-quantidade"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { createVenda } from "@/services/compra-service"

import { toast } from "@/components/ui/use-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { CreateVendaDTO } from "@/entities/DTOs/create-venda-dto"
import ConfirmCompra from "../confirm-compra"
import { useNavigate } from "react-router-dom"

interface IFormularioCompraProps {
  produto: Produto
}

const vendaCreateSchema = z.object({
  clienteCPF: z.string(),
  quantidade: z.number(),
  parcelas: z.number(),
})

type VendaCreateSchema = z.infer<typeof vendaCreateSchema>

function FormularioCompra({ produto }: IFormularioCompraProps) {
  const navigate = useNavigate()
  const cpfCliente = sessionStorage.getItem("cpf") || ""
  const [quantidade, setQuantidade] = useState(1)
  const [precoTotal, setPrecoTotal] = useState(Number(produto.preco))

  const { register, control, handleSubmit } = useForm<VendaCreateSchema>({
    mode: "all",
    resolver: zodResolver(vendaCreateSchema),
  })

  const { mutateAsync: realizarVenda } = useMutation({
    mutationFn: createVenda,
    onSuccess: () => {
      toast({ title: "Compra realizada com sucesso." })
      navigate("/")
    },
    onError: (error: any) => {
      toast({ title: error.data.message, variant: "destructive" })
    },
  })

  function handleCreateVenda(values: VendaCreateSchema) {
    try {
      const venda = new CreateVendaDTO({
        cpf: values.clienteCPF,
        produto: produto.id,
        quantidade: quantidade,
        valor: precoTotal,
        parcelas: values.parcelas,
      })
      realizarVenda(venda)
    } catch (error) {
      // console.log(error)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="overflow-hidden flex flex-wrap rounded-md">
        <div className="w-full sm:w-full md:w-1/2 xl:w-1/2 flex justify-center p-6">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="size-[500px]"
          />
        </div>
        <div className="flex flex-col self-center justify-between h-1/2 w-full sm:w-full md:w-1/2 xl:w-1/2 p-6 bg-gray-50">
          <div>
            <h1 className="text-3xl">{produto.nome}</h1>
            <hr className="border-1 border-gray-400 my-2" />
            <p>{produto.descricao}</p>
            <div className="my-2 flex items-center">
              <p className="font-bold text-3xl w-full">
                R$ {precoTotal.toFixed(2)}
              </p>

              <input
                type="text"
                hidden
                value={cpfCliente}
                {...register("clienteCPF")}
              />

              <Controller
                name="quantidade"
                control={control}
                defaultValue={1}
                render={({ field }) => (
                  <InputQuantidade
                    onChange={(value) => {
                      setQuantidade(value)
                      setPrecoTotal(value * produto.preco)
                      field.onChange(value)
                    }}
                  />
                )}
              />
            </div>
            <Controller
              name="parcelas"
              control={control}
              defaultValue={1}
              render={({ field }) => (
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Quantidade de parcelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">
                      1x de R$ {precoTotal.toFixed(2)}
                    </SelectItem>
                    <SelectItem value="2">
                      2x de R$ {(precoTotal / 2).toFixed(2)}
                    </SelectItem>
                    <SelectItem value="3">
                      3x de R$ {(precoTotal / 3).toFixed(2)}
                    </SelectItem>
                    <SelectItem value="4">
                      4x de R$ {(precoTotal / 4).toFixed(2)}
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <ConfirmCompra
            totalCompra={precoTotal}
            submit={handleSubmit(handleCreateVenda)}
          />
        </div>
      </div>
    </div>
  )
}

export default FormularioCompra
