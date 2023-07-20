import Expediente from "./Expediente"
import ExpedienteList from "./ExpedienteList"

describe("ExpedienteList", () => {
  test("deve criar uma lista de expedientes", () => {
    const lista = ExpedienteList.create([])
    expect(lista).toBeDefined()
  })

  test("deve adicionar expedientes na lista de expedientes", () => {
    const lista = ExpedienteList.create([])
    expect(lista.getItems()).toHaveLength(0)
    const expediente = Expediente.create({
      tipo: "Extração automatizada",
      pontuacao: 1,
      criticidade: "Baixa",
    })
    lista.add(expediente)
    expect(lista.getItems()).toHaveLength(1)
  })
})
