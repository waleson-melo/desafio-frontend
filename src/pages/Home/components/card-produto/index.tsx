import { Produto } from "@/entities/produto"
import { Info, ShoppingBag } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

interface ICardProdutoProps {
  produto: Produto
}

function CardProduto({ produto }: ICardProdutoProps) {
  const [hover, setHover] = useState(false)

  return (
    <div
      className="md:w-1/3 xl:w-1/5 hover:shadow-lg rounded-md"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="relative">
        <img
          src={produto.imagem}
          alt={produto.id}
          className={`p-6 transition-transform duration-300 transform ${
            hover ? "scale-110" : ""
          }`}
        />
        <div
          className={`absolute rounded-md top-0 left-0 w-full h-full flex items-end justify-center bg-gray-300 bg-opacity-50 text-white text-center opacity-0 ${
            hover ? "opacity-100" : ""
          } transition-opacity duration-300`}
        >
          <Link
            to={"/comprar/?produto=" + produto.id}
            className="flex justify-center items-center gap-2 w-full bg-gray-800 p-2 px-3 rounded-md hover:bg-gray-700"
          >
            <ShoppingBag size={20} />
            Comprar
          </Link>
        </div>
      </div>
      <div className="bg-gray-100 px-2 rounded-b-md">
        <div className="pt-3 flex items-center justify-between">
          <p>{produto.nome}</p>
          <span title={produto.descricao}>
            <Info size={18} className="text-gray-400" />
          </span>
        </div>
        <p className="pt-1 pb-2 text-gray-900 font-bold">R${produto.preco}</p>
      </div>
    </div>
  )
}

export default CardProduto
