import Gpinf from "@/Domain/Gpinf"
import { ExpedienteMock } from "@/Mocks/ExpedienteMock"
import { PeritoMock } from "@/Mocks/PeritoMock"
import DateBr from "../Domain/ValueObjects/DateBr"
import { Criticidade } from "../Domain/ValueObjects/Criticidade"
import { TipoExame } from "../Domain/ValueObjects/TipoExame"

export const ConfigGpinf = (): Gpinf => {
  const gpinf = Gpinf.create({})
  expect(gpinf).toBeDefined()

  const weber = PeritoMock({
    gpinf,
    nome: "Weber Rener Paiva",
    matricula: "9780",
  })

  const rafael = PeritoMock({
    gpinf,
    nome: "Rafael Queiroz",
    matricula: "12581",
  })

  const clayton = PeritoMock({
    gpinf,
    nome: "Clayton Ogawa",
    matricula: "2345",
  })

  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-01T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 1,
    criticidade: Criticidade.BAIXA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-01T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 2,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-05T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 2,
    criticidade: Criticidade.BAIXA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-05T00:00:00"),
    tipo: TipoExame.ANALISE_CONTEUDO,
    pontuacao: 2,
    criticidade: Criticidade.BAIXA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-10T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 1,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-10T00:00:00"),
    tipo: TipoExame.ANALISE_CONTEUDO,
    pontuacao: 1,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-15T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 3,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-20T00:00:00"),
    tipo: TipoExame.EXTRACAO_AUTOMATIZADA,
    pontuacao: 1,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-20T00:00:00"),
    tipo: TipoExame.PIJ,
    pontuacao: 5,
    criticidade: Criticidade.ALTA,
  })
  ExpedienteMock({
    gpinf,
    data: DateBr.create("2023-01-20T00:00:00"),
    tipo: TipoExame.PIJ,
    pontuacao: 3,
    criticidade: Criticidade.BAIXA,
  })

  gpinf.expedientes.getItems()[0].addMovimentacao(weber)
  gpinf.expedientes.getItems()[1].addMovimentacao(weber)
  gpinf.expedientes.getItems()[2].addMovimentacao(rafael)
  gpinf.expedientes.getItems()[3].addMovimentacao(rafael)
  gpinf.expedientes.getItems()[4].addMovimentacao(clayton)

  return gpinf
}
