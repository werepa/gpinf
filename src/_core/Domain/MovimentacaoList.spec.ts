import DateBr from "@/Shared/Domain/ValueObjects/DateBr"
import { PeritoMock } from "@/Mocks/PeritoMock"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import MovimentacaoList from "./MovimentacaoList"
import { MovimentacaoMock } from "@/Mocks/MovimentacaoMock"

describe("MovimentacaoList", () => {
  test("deve criar uma lista de movimentacoes", () => {
    const lista = MovimentacaoList.create([])
    expect(lista).toBeDefined()
  })

  test("deve adicionar movimentacoes a uma lista de movimentacoes", () => {
    const lista = MovimentacaoList.create([])
    lista.add(
      MovimentacaoMock({
        data: DateBr.create(new Date()),
        carga: PeritoMock({ nome: "Fulano de Tal" }),
        idadeExpediente: 3,
        criticidade: Criticidade.ALTA,
      })
    )
    expect(lista.getItems()).toHaveLength(1)
  })

  test("deve impedir movimentacões repetidas", () => {
    const lista = MovimentacaoList.create([])
    const movimentacao = MovimentacaoMock({ carga: PeritoMock() })
    lista.add(movimentacao)
    expect(() => lista.add(movimentacao)).toThrow(`O perito matrícula "${movimentacao.carga.matricula}" já é o responsável atual!`)
  })
})
