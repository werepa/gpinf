import Perito from "./Perito"

describe("Perito", () => {
  test("deve criar um Perito", () => {
    const perito = Perito.create({
      nome: "Fulano de Tal",
      matricula: "1234",
    })
    expect(perito).toBeDefined()
    expect(perito.matricula).toBeDefined()
  })
})
