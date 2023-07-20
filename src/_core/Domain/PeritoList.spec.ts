import { PeritoMock } from "@/Mocks/PeritoMock"
import PeritoList from "./PeritoList"
import { ConfigGpinf } from "@/Shared/Tests/ConfigGpinf"

describe("PeritoList", () => {
  test("deve criar uma lista de Peritos", () => {
    const lista = PeritoList.create([])
    expect(lista).toBeDefined()
  })

  test("deve adicionar um perito na lista", () => {
    const lista = PeritoList.create([])
    expect(lista.getItems()).toHaveLength(0)
    lista.add(PeritoMock())
    expect(lista.getItems()).toHaveLength(1)
  })

  test("deve retornar um perito pela matricula", () => {
    const gpinf = ConfigGpinf()
    const perito = gpinf.peritos.getByMatricula("9780")
    expect(perito.nome).toBe("Weber Rener Paiva")
  })

  test("deve retornar um erro se matricula não existe", () => {
    const gpinf = ConfigGpinf()
    expect(() => gpinf.peritos.getByMatricula("notExist")).toThrow(`A matrícula "notExist" não existe no Gpinf!`)
  })

  test("deve ordenar os peritos por nome", () => {
    const lista = PeritoList.create([])
    const perito1 = PeritoMock({ nome: "Fulano de Tal" })
    const perito2 = PeritoMock({ nome: "Beltrano da Silva" })
    const perito3 = PeritoMock({ nome: "Ciclano de Sousa" })
    lista.add(perito1)
    lista.add(perito2)
    lista.add(perito3)
    expect(lista.getCount()).toBe(3)
    expect(lista.getItems()[0].nome).toBe(perito2.nome)
    expect(lista.getItems()[1].nome).toBe(perito3.nome)
    expect(lista.getItems()[2].nome).toBe(perito1.nome)
  })

  test("deve impedir adicionar um perito que já existe no GPINF", () => {
    const lista = PeritoList.create([])
    const perito = PeritoMock()
    lista.add(perito)
    expect(() => lista.add(perito)).toThrow("Este perito já pertence ao GPINF!")
  })
})
