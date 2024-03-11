import { Button } from "@/components/ui/button"
import { GetComprasDTO } from "@/entities/DTOs/get-compras-dto"
import { Link } from "react-router-dom"

interface IFormularioCompraProps {
  compra: GetComprasDTO
}

function CardCompras({ compra }: IFormularioCompraProps) {
  return (
    <div className="w-full md:w-1/2">
      <div className="flex items-center m-2 border  rounded-md">
        <div className="w-1/2">
          <img
            src={compra.imagem}
            alt="produto"
            className="size-40"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="bg-gray-100 h-full w-full p-4">
          <p className="text-lg font-bold">{compra.nome}</p>
          <span className="text-lg">
            Valor: <b>R$ {Number(compra.valor).toFixed(2)}</b>
          </span>
          <p className="text-lg">
            Parcelas: <b>{compra.parcelas}</b>
          </p>
          <Link to={"/pagar-parcela/?compra=" + compra.id} className="w-full">
            <Button className="w-full my-2">Pagar parcela</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CardCompras
