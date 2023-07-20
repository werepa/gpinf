import DateBr from "./DateBr"

describe("ValueObjects => DateBr", () => {
  test("deve criar uma dateBr", () => {
    let data = DateBr.create()
    expect(data).toBeDefined()
    expect(data instanceof Date).toBe(true)

    data = DateBr.create("2023-01-07T00:00:00")
    expect(data).toBeDefined()
    expect(data instanceof Date).toBe(true)
    expect(data.getDate()).toBe(7)
    expect(data.getMonth()).toBe(0)
    expect(data.getFullYear()).toBe(2023)
  })

  test("deve retornar a data no formato BR", () => {
    const data = DateBr.create("2023-01-07T00:00:00")
    expect(data.formatoBr).toBe("07/01/2023")
  })

  test("deve somar n dias na data", () => {
    const data = DateBr.create("2023-01-07T00:00:00")
    data.somaDias(3)
    expect(data.formatoBr).toBe("10/01/2023")
  })

  test("deve calcular o intervalo de dias entre as datas", () => {
    const data = DateBr.create("2023-01-07T00:00:00")
    expect(data.formatoBr).toBe("07/01/2023")

    expect(data.intervalo(data)).toBe(0)
    expect(data.intervalo(new Date("2023-01-08"))).toBe(1)
    expect(data.intervalo(DateBr.create("2023-01-10"))).toBe(3)
    expect(data.intervalo(new Date("2023-01-01"))).toBe(-6)
  })
})
