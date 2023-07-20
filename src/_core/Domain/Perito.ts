import { ValueObject } from "@/Shared/Domain/Entities/ValueObject"

interface PeritoProps {
  nome: string
  matricula: string
}

export default class Perito extends ValueObject<PeritoProps> {
  private constructor(props: PeritoProps) {
    super(props)
  }

  static create(props: PeritoProps) {
    return new Perito(props)
  }

  get nome() {
    return this.props.nome
  }

  set nome(value: string) {
    this.props.nome = value
  }

  get matricula() {
    return this.props.matricula
  }

  set matricula(value: string) {
    this.props.matricula = value
  }
}
