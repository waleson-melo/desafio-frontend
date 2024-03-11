export class Produto {
  public id!: string
  public nome!: string
  public descricao!: string
  public preco!: number
  public imagem!: string

  constructor(props: Produto) {
    Object.assign(this, props)
  }
}
