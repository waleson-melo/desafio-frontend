export class GetComprasDTO {
  id!: string
  imagem!: string
  quantidade!: number
  valor!: number
  parcelas!: number
  nome!: string

  constructor(props: GetComprasDTO) {
    Object.assign(this, props)
  }
}
