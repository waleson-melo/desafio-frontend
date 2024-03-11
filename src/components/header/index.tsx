import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import SearchBar from "../search-bar"

import Logo from "@/assets/logo.png"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

interface IHeaderProps {
  searchBar?: boolean
}

function Header({ searchBar = true }: IHeaderProps) {
  const navigate = useNavigate()
  function logout() {
    sessionStorage.removeItem("cpf")
    navigate("/")
    window.location.reload()
  }

  return (
    <div className="bg-gray-100 flex justify-between items-center px-5">
      <Link to={"/"}>
        <img src={Logo} alt="logo" className="size-20" />
      </Link>
      {searchBar && <SearchBar className="w-full px-24" />}
      <Popover>
        <PopoverTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-80 flex flex-col items-center">
          <Avatar className="m-4 size-[30%]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>NM</AvatarFallback>
          </Avatar>
          <p className="text-lg font-bold">
            Olá, {sessionStorage.getItem("nome")}
          </p>
          <Link to="/minhas-compras" className="w-full my-2">
            <Button variant={"outline"} className="w-full">
              Minhas compras
            </Button>
          </Link>
          <Button
            onClick={logout}
            variant={"outline"}
            className="w-full text-red-500 hover:text-red-700"
          >
            Logout
          </Button>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Header
