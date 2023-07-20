import DateBr from "@/Shared/Domain/ValueObjects/DateBr"
import Movimentacao from "./Movimentacao"
import { PeritoMock } from "@/Mocks/PeritoMock"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"

describe("Movimentacao", () => {
  test("deve criar uma movimentacao", () => {
    const movimentacao = Movimentacao.create({
      data: DateBr.create(new Date()),
      carga: PeritoMock({ nome: "Fulano de Tal" }),
      idadeExpediente: 3,
      criticidade: Criticidade.ALTA,
    })
    expect(movimentacao).toBeDefined()
    expect(movimentacao.carga.nome).toBe("Fulano de Tal")
  })
})
