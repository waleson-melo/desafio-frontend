import Header from "@/components/header"
import CardCompras from "./CardCompras"
import { useQuery } from "@tanstack/react-query"
import { getComprasByCPF } from "@/services/compra-service"

function MinhasCompras() {
  const { data: compras, isLoading } = useQuery({
    queryKey: ["compras"],
    queryFn: () => getComprasByCPF("12345678901"),
  })

  return (
    <div>
      <Header searchBar={false} />
      <h1 className="text-2xl font-bold">Minhas Compras</h1>
      <div className="flex flex-wrap p-2">
        {isLoading && <p>Carregando...</p>}
        {compras?.map((compra: any) => (
          <CardCompras key={compra.id} compra={compra} />
        ))}
      </div>
    </div>
  )
}

export default MinhasCompras
