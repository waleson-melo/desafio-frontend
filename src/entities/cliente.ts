export class Cliente {
  public id!: string
  public nome!: string
  public email!: string
  public cpf!: string

  constructor(props: Cliente) {
    Object.assign(this, props)
  }
}
