export class Venda {
  public id!: string
  public cliente!: string
  public produto!: string
  public quantidade!: number
  public valor!: number
  public parcelas!: number

  constructor(props: Venda) {
    Object.assign(this, props)
  }
}
