import { getProdutoById } from "@/services/produto-service"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import FormularioCompra from "./components/formulario-compra"
import Header from "@/components/header"

function Compra() {
  const [searchParams] = useSearchParams()
  const produtoId = searchParams.get("produto")

  const [total, setTotal] = useState(1.0)

  const { data: produto, isLoading } = useQuery({
    queryKey: ["produto", produtoId],
    queryFn: () => getProdutoById(produtoId!),
  })

  if (produto && total === 1) {
    setTotal(produto.preco)
  }

  return (
    <>
      <Header searchBar={false} />
      {isLoading ? (
        <p>Carregando...</p>
      ) : produto ? (
        <FormularioCompra produto={produto} />
      ) : (
        <p>Produto não encontrado</p>
      )}
    </>
  )
}

export default Compra
