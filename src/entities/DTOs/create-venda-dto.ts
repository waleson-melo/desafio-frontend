export class CreateVendaDTO {
  cpf!: string
  produto!: string
  quantidade!: number
  valor!: number
  parcelas!: number

  constructor(props: CreateVendaDTO) {
    Object.assign(this, props)
  }
}
