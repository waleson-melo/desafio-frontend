import "./input-quantidade.css"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus } from "lucide-react"
import { useState } from "react"

interface IInputQuantidadeProps {
  onChange: (value: number) => void
}

function InputQuantidade({ onChange }: IInputQuantidadeProps) {
  const [quantidade, setQuantidade] = useState(1)

  const decrementar = () => {
    if (quantidade === 1) {
      return
    }
    setQuantidade(quantidade - 1)
    onChange(quantidade - 1)
  }

  const incrementar = () => {
    setQuantidade(quantidade + 1)
    onChange(quantidade + 1)
  }

  const handleQuantidade = (value: number) => {
    if (isNaN(value)) {
      setQuantidade(1)
      return
    }
    if (value < 0) {
      return
    }
    setQuantidade(value)
    onChange(value)
  }

  return (
    <div className="flex">
      <Button
        onClick={decrementar}
        type="button"
        className="rounded-none rounded-s-md"
      >
        <Minus size={20} />
      </Button>
      <Input
        value={quantidade}
        onChange={(e) => {
          handleQuantidade(e.target.valueAsNumber)
        }}
        className="w-full text-center rounded-none input-quantidade"
        type="number"
        style={{
          WebkitAppearance: "none",
          appearance: "none",
          margin: 0,
        }}
      />
      <Button
        onClick={incrementar}
        type="button"
        className="rounded-none rounded-e-md"
      >
        <Plus size={20} />
      </Button>
    </div>
  )
}

export default InputQuantidade
