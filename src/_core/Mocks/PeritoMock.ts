import { faker } from "@faker-js/faker"
import Perito from "@/Domain/Perito"
import Gpinf from "@/Domain/Gpinf"

interface PeritoMockProps {
  gpinf?: Gpinf
  nome?: string
  matricula?: string
}

export const PeritoMock = (props?: PeritoMockProps): Perito => {
  props = props ?? {}
  let perito

  props.nome = props.nome ?? faker.lorem.words(3)
  props.matricula = props.matricula ?? faker.lorem.word()

  if (!perito) {
    perito = Perito.create({ nome: props.nome, matricula: props.matricula })
  }

  if (props.gpinf) {
    props.gpinf.peritos.add(perito)
  }

  return perito
}
