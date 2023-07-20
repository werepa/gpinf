import Gpinf from "@/Domain/Gpinf"
import { PeritoMock } from "./PeritoMock"

describe("PeritoMock", () => {
  test("deve criar um mock de Perito", () => {
    const perito = PeritoMock()
    expect(perito).toBeDefined()
    expect(perito.nome.length).toBeGreaterThan(0)
    expect(perito.matricula.length).toBeGreaterThan(0)
  })

  test("deve criar um mock de Perito, conforme parâmetros", () => {
    const peritoProps = {
      nome: "Fulano de Tal",
      matricula: "1234",
    }
    const perito = PeritoMock(peritoProps)
    expect(perito.nome).toBe(peritoProps.nome)
    expect(perito.matricula).toBe(peritoProps.matricula)
  })

  test("deve adicionar o perito ao Gpinf", () => {
    const gpinf = Gpinf.create({})
    expect(gpinf.peritos.getCount()).toBe(0)
    const perito = PeritoMock({ gpinf })
    expect(gpinf.peritos.getCount()).toBe(1)
    expect(gpinf.peritos.getItems()[0]).toEqual(perito)
  })
})
