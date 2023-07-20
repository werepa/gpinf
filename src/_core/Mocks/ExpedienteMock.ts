import Gpinf from "@/Domain/Gpinf"
import Expediente from "@/Domain/Expediente"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import { TipoExame } from "@/Shared/Domain/ValueObjects/TipoExame"
import { Status } from "@/Shared/Domain/ValueObjects/Status"
import DateBr from "@/Shared/Domain/ValueObjects/DateBr"

interface ExpedienteMockProps {
  gpinf?: Gpinf
  id?: string
  data?: DateBr
  tipo?: TipoExame
  pontuacao?: number
  criticidade?: Criticidade
  status?: Status
}

export const ExpedienteMock = (props?: ExpedienteMockProps): Expediente => {
  props = props ?? {}
  let expediente

  props.tipo = props.tipo ?? TipoExame.EXTRACAO_AUTOMATIZADA
  props.pontuacao = props.pontuacao ?? 1
  props.criticidade = props.criticidade ?? Criticidade.BAIXA
  props.status = props.status ?? Status.AGUARDANDO_DISTRIBUICAO

  if (!expediente) {
    expediente = Expediente.create({
      data: DateBr.create(),
      tipo: props.tipo,
      pontuacao: props.pontuacao,
      criticidade: props.criticidade,
      status: props.status,
      id: props.id,
    })
  }

  if (props.gpinf) {
    props.gpinf.expedientes.add(expediente)
  }

  return expediente
}
