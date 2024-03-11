import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { login } from "@/services/login-service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { z } from "zod"

const loginSchema = z.object({
  cpf: z.string(),
  senha: z.string(),
})

type LoginSchema = z.infer<typeof loginSchema>

function Login() {
  const { register, handleSubmit } = useForm<LoginSchema>({
    mode: "all",
    resolver: zodResolver(loginSchema),
  })

  const { mutateAsync: realizarLogin } = useMutation({
    mutationFn: login,
    onSuccess: (variable) => {
      toast({ title: "Login realizado com sucesso" })
      console.log(variable)
      sessionStorage.setItem("cpf", variable.cpf)
      sessionStorage.setItem("nome", variable.nome)
      window.location.reload()
    },
    onError: (_error: any) => {
      toast({ title: "Dados incorretos", variant: "destructive" })
    },
  })

  function handleLogin(values: any) {
    try {
      realizarLogin(values)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-[100vh] flex items-center justify-center">
      <div className="w-96 flex flex-col items-center">
        <h1 className="text-4xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(handleLogin)} className="w-full">
          <Input
            type="text"
            placeholder="CPF"
            {...register("cpf")}
            className="w-full my-2"
          />
          <Input
            type="password"
            placeholder="Senha"
            {...register("senha")}
            className="w-full my-2"
          />
          <Button type="submit" className="w-full text-white my-2">
            Entrar
          </Button>
        </form>
        <Link to={"/criar-conta"} className="hover:text-blue-500">
          Criar conta
        </Link>
      </div>
    </div>
  )
}

export { Login }
