import { TipoExame } from "@/Shared/Domain/ValueObjects/TipoExame"
import Expediente from "./Expediente"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import DateBr from "@/Shared/Domain/ValueObjects/DateBr"
import { Status } from "@/Shared/Domain/ValueObjects/Status"
import { ExpedienteMock } from "@/Mocks/ExpedienteMock"
import { PeritoMock } from "@/Mocks/PeritoMock"

describe("Expediente", () => {
  test("deve criar um expediente", () => {
    const expediente = Expediente.create({
      tipo: TipoExame.ANALISE_CONTEUDO,
      pontuacao: 1,
      criticidade: Criticidade.ALTA,
      data: DateBr.create("2024-01-10T00:00:00"),
    })
    expect(expediente).toBeDefined()
    expect(expediente.data.formatoBr).toBe("10/01/2024")
    expect(expediente.status).toBe(Status.AGUARDANDO_DISTRIBUICAO)
    expect(expediente.movimentacoes.getCount()).toBe(0)
  })

  test("deve retornar o responsavel atual do expediente", () => {
    const expediente = ExpedienteMock()
    const perito1 = PeritoMock()
    const perito2 = PeritoMock()
    expect(expediente.responsavel()).toBeNull()
    expediente.addMovimentacao(perito1)
    expect(expediente.responsavel()).toEqual(perito1)
    expediente.addMovimentacao(perito2)
    expect(expediente.responsavel()).toEqual(perito2)
  })
})
