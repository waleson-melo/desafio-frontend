import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { getSaldoByCPF } from "@/services/credito-service"
import { useQuery } from "@tanstack/react-query"
import { ShoppingCart } from "lucide-react"

interface IFormularioCompraProps {
  totalCompra: number
  submit: (e: any) => any
}

function ConfirmCompra({ totalCompra, submit }: IFormularioCompraProps) {
  const { data: saldo, isLoading } = useQuery({
    queryKey: ["saldo"],
    queryFn: () => getSaldoByCPF(sessionStorage.getItem("cpf")!),
  })

  function handleSubmit(e: any) {
    submit(e)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="mt-5 p-8 w-full uppercase font-bold">
          <ShoppingCart className="mr-3" />
          Comprar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar compra</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <p className="font-bold">
            Seu saldo:
            {isLoading ? (
              <>Carregando...</>
            ) : saldo ? (
              <span
                className={`
                text-2xl
                ${Number(saldo) > 0 ? "text-green-600" : "text-red-400"}`}
              >
                {" "}
                R$ {Number(saldo).toFixed(2)}
              </span>
            ) : (
              <>Saldo: R$ 0.00</>
            )}
          </p>
          {saldo && saldo - totalCompra < 0 ? (
            <p className="text-red-400">
              Saldo insuficiente para realizar a compra
            </p>
          ) : (
            <p className="font-bold">
              Novo saldo:{" "}
              <span className="text-yellow-600 text-2xl">
                R$ {Number(saldo - totalCompra).toFixed(2)}
              </span>
            </p>
          )}
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" disabled={saldo && saldo - totalCompra < 0}>
                Confirmar
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmCompra
