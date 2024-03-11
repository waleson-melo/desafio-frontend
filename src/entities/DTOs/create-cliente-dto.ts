export class CreateClientDTO {
  cpf!: string
  nome!: string
  email!: string
  senha!: string
  cep!: string
  rua!: string
  numero!: string
  bairro!: string
  complemento!: string
  cidade!: string
  estado!: string

  constructor(props: CreateClientDTO) {
    Object.assign(this, props)
  }
}
