import { Eraser, Search } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useSearchParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

interface ISearchBarProps {
  className?: string
}

const searchBarSchema = z.object({
  search: z.string(),
})

type SearchBarSchema = z.infer<typeof searchBarSchema>

function SearchBar({ className }: ISearchBarProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { register, handleSubmit, reset } = useForm<SearchBarSchema>({
    mode: "all",
    resolver: zodResolver(searchBarSchema),
    defaultValues: {
      search: searchParams.get("search") || "",
    },
  })

  function handleSearch({ search }: SearchBarSchema) {
    setSearchParams((state) => {
      if (search) {
        state.set("search", search)
      } else {
        state.delete("search")
      }
      return state
    })
  }

  function handleReset() {
    reset()
    setSearchParams((state) => {
      state.delete("search")
      return state
    })
  }

  return (
    <form
      onSubmit={handleSubmit(handleSearch)}
      onReset={handleReset}
      className={className}
    >
      <div className="flex gap-2 items-center">
        <Input
          type="text"
          placeholder="Pesquiar produto..."
          {...register("search")}
        />
        <Button type="submit">
          <Search size={20} className="2" />
        </Button>
        <Button type="reset">
          <Eraser size={20} />
        </Button>
      </div>
    </form>
  )
}

export default SearchBar
