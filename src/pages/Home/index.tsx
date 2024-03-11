import { getProdutos } from "@/services/produto-service"
import { useQuery } from "@tanstack/react-query"
import CardProduto from "./components/card-produto"
import { useSearchParams } from "react-router-dom"
import Header from "@/components/header"

function Home() {
  const { data: produtos, isLoading } = useQuery({
    queryKey: ["produtos"],
    queryFn: getProdutos,
  })
  const [searchParams] = useSearchParams()
  const search = searchParams.get("search")

  let listProdutos = produtos

  if (!isLoading) {
    if (search) {
      const searchLower = search.toLowerCase()
      listProdutos = listProdutos?.filter((produto) =>
        produto.nome.toLowerCase().includes(searchLower)
      )
    }
  }

  return (
    <div>
      <Header />
      <div className="container flex flex-col">
        <div className="flex items-center justify-center flex-wrap gap-6 pt-4 pb-12">
          {isLoading ? (
            <p>Carregando...</p>
          ) : listProdutos && listProdutos.length > 0 ? (
            <>
              {listProdutos.map((produto) => (
                <CardProduto key={produto.id} produto={produto} />
              ))}
            </>
          ) : search ? (
            <p>Nenhum produto encontrado</p>
          ) : (
            <p>Nenhum produto cadastrado</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
