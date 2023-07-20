import { faker } from "@faker-js/faker"
import Movimentacao from "@/Domain/Movimentacao"
import Expediente from "@/Domain/Expediente"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import Perito from "@/Domain/Perito"
import DateBr from "@/Shared/Domain/ValueObjects/DateBr"

interface MovimentacaoMockProps {
  expediente?: Expediente
  data?: DateBr
  carga?: Perito
  idadeExpediente?: number
  criticidade?: Criticidade
}

export const MovimentacaoMock = (props?: MovimentacaoMockProps): Movimentacao => {
  props = props ?? {}
  let movimentacao

  props.data = props.data ?? DateBr.create(faker.date.recent())

  if (!movimentacao) {
    movimentacao = Movimentacao.create({ data: props.data, carga: props.carga, idadeExpediente: props.idadeExpediente, criticidade: props.criticidade })
  }

  if (props.expediente) {
    props.expediente.movimentacoes.add(movimentacao)
  }

  return movimentacao
}
