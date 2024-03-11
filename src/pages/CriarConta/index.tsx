import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { CreateClientDTO } from "@/entities/DTOs/create-cliente-dto"
import { createCliente } from "@/services/cliente-service"
import { getEnderecoByCep } from "@/services/consultar-cep-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Controller, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

const criarContaSchema = z.object({
  cpf: z.string(),
  nome: z.string(),
  email: z.string(),
  senha: z.string(),
  cep: z.string(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
  complemento: z.string(),
  cidade: z.string(),
  estado: z.string(),
})

type CriarContaSchema = z.infer<typeof criarContaSchema>

function CriarConta() {
  const navigate = useNavigate()
  const { register, control, handleSubmit, setValue } =
    useForm<CriarContaSchema>({
      mode: "all",
      resolver: zodResolver(criarContaSchema),
    })

  const { mutateAsync: getEndereco } = useMutation({
    mutationFn: getEnderecoByCep,
    onSuccess: (variables) => {
      setValue("rua", variables.logradouro)
      setValue("bairro", variables.bairro)
      setValue("cidade", variables.localidade)
      setValue("estado", variables.uf)
    },
    onError: (error: any) => {
      toast({ title: error.message, variant: "destructive" })
    },
  })

  const { mutateAsync: createConta } = useMutation({
    mutationFn: createCliente,
    onSuccess: (variables) => {
      navigate("/login")
    },
    onError: (error: any) => {
      toast({ title: error.message, variant: "destructive" })
    },
  })

  function cepChangeHandler(cep: string) {
    if (cep.length === 8) {
      getEndereco(cep)
    }
  }

  function handleCriarConta(values: CriarContaSchema) {
    try {
      createConta(new CreateClientDTO(values))
    } catch (error) {
      console.log("Erro ao criar conta:", error)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-[500pt] flex flex-col items-center">
        <h1 className="text-4xl font-bold">Criar Conta</h1>
        <form onSubmit={handleSubmit(handleCriarConta)} className="w-full">
          <Input
            placeholder="CPF"
            className="w-full my-2"
            {...register("cpf")}
          />
          <Input
            placeholder="Nome"
            className="w-full my-2"
            {...register("nome")}
          />
          <Input
            placeholder="email"
            type="email"
            className="w-full my-2"
            {...register("email")}
          />
          <Input
            type="password"
            placeholder="Senha"
            className="w-full my-2"
            {...register("senha")}
          />
          <Controller
            name="cep"
            control={control}
            render={({ field }) => (
              <Input
                placeholder="CEP"
                onChange={(value) => {
                  cepChangeHandler(value.target.value)
                  field.onChange(value)
                }}
                className="w-full my-2"
              />
            )}
          />
          <div className="flex gap-4">
            <div className="w-1/2">
              <Input
                placeholder="Rua"
                className="w-full"
                {...register("rua")}
              />
              <Input
                placeholder="Número"
                type="number"
                className="w-full my-2"
                {...register("numero")}
              />
              <Input
                placeholder="Bairro"
                className="w-full my-2"
                {...register("bairro")}
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Complemento"
                className="w-full"
                {...register("complemento")}
              />
              <Input
                placeholder="Cidade"
                className="w-full my-2"
                {...register("cidade")}
              />
              <Input
                placeholder="Estado"
                className="w-full my-2"
                {...register("estado")}
              />
            </div>
          </div>
          <Button type="submit" className="w-full my-2">
            Criar
          </Button>
          <p className="my-2">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-500">
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default CriarConta
