import Entity from "@/Shared/Domain/Entities/Entity"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import { Status } from "@/Shared/Domain/ValueObjects/Status"
import { TipoExame } from "@/Shared/Domain/ValueObjects/TipoExame"
import MovimentacaoList from "./MovimentacaoList"
import Movimentacao from "./Movimentacao"
import DateBr from "@/Shared/Domain/ValueObjects/DateBr"
import Perito from "./Perito"

interface ExpedienteProps {
  id?: string
  data: DateBr
  tipo: TipoExame
  pontuacao: number
  criticidade: Criticidade
  status?: Status
}

export default class Expediente extends Entity<ExpedienteProps> {
  private _movimentacoes: MovimentacaoList

  private constructor(props: ExpedienteProps) {
    super(props)
    props.id = this._id
    props.status = props.status ?? Status.AGUARDANDO_DISTRIBUICAO
    this._movimentacoes = MovimentacaoList.create([])
  }

  static create(props: ExpedienteProps) {
    return new Expediente(props)
  }

  get data(): DateBr {
    return this.props.data
  }

  set data(value: Date) {
    this.props.data = DateBr.create(value)
  }

  get tipo() {
    return this.props.tipo
  }

  set tipo(value: TipoExame) {
    this.props.tipo = value
  }

  get pontuacao() {
    return this.props.pontuacao
  }

  set pontuacao(value: number) {
    this.props.pontuacao = value
  }

  get criticidade() {
    return this.props.criticidade
  }

  set criticidade(value: Criticidade) {
    this.props.criticidade = value
  }

  get status() {
    return this.props.status
  }

  set status(value: Status) {
    this.props.status = value
  }

  get movimentacoes() {
    return this._movimentacoes
  }

  addMovimentacao(perito: Perito) {
    const hoje = DateBr.create(new Date())
    const dataExpediente = this.data
    const movimentacao = Movimentacao.create({
      data: hoje,
      carga: perito,
      idadeExpediente: dataExpediente.intervalo(hoje),
      criticidade: this.props.criticidade,
    })
    this.movimentacoes.add(movimentacao)
    this.props.status = Status.PENDENTE
  }

  ultimaMovimentacao(): Movimentacao {
    if (!this.movimentacoes.getCount()) return null
    return this.movimentacoes.getItems()[this.movimentacoes.getCount() - 1]
  }

  responsavel() {
    const ultimaMovimentacao = this.ultimaMovimentacao()
    if (!ultimaMovimentacao) return null
    return ultimaMovimentacao.carga
  }
}
