import { ValueObject } from "@/Shared/Domain/Entities/ValueObject"
import Perito from "./Perito"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import DateBr from "@/Shared/Domain/ValueObjects/DateBr"

interface MovimentacaoProps {
  data: DateBr
  carga: Perito
  idadeExpediente: number
  criticidade: Criticidade
}

export default class Movimentacao extends ValueObject<MovimentacaoProps> {
  private constructor(props: MovimentacaoProps) {
    super(props)
  }

  static create(props: MovimentacaoProps) {
    return new Movimentacao(props)
  }

  get data() {
    return this.props.data
  }

  get carga() {
    return this.props.carga
  }

  get idadeExpediente() {
    return this.props.idadeExpediente
  }

  get criticidade() {
    return this.props.criticidade
  }
}
