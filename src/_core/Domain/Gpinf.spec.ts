import { ExpedienteMock } from "@/Mocks/ExpedienteMock"
import { Status } from "@/Shared/Domain/ValueObjects/Status"
import { ConfigGpinf } from "@/Shared/Tests/ConfigGpinf"
import Gpinf from "./Gpinf"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import { TipoExame } from "@/Shared/Domain/ValueObjects/TipoExame"

describe("Gpinf", () => {
  let gpinf: Gpinf

  beforeEach(() => {
    gpinf = ConfigGpinf()
  })

  test("deve ter uma lista de peritos", () => {
    expect(gpinf.peritos.getItems()).toHaveLength(3)
  })

  test("deve ter uma lista de expedientes", () => {
    expect(gpinf.expedientes.getItems()).toHaveLength(10)
  })

  test("deve adicionar uma movimentacao ao expediente", () => {
    const expediente = ExpedienteMock({ gpinf })
    expect(expediente.status).toBe(Status.AGUARDANDO_DISTRIBUICAO)
    expect(expediente.movimentacoes.getItems()).toHaveLength(0)
    const perito = gpinf.peritos[0]
    expediente.addMovimentacao(perito)
    expect(expediente.status).toBe(Status.PENDENTE)
    expect(expediente.movimentacoes.getItems()).toHaveLength(1)
  })

  test("deve listar expedientes pendentes de distribuição", () => {
    const distribuição = gpinf.listByStatus(Status.AGUARDANDO_DISTRIBUICAO)
    expect(distribuição).toHaveLength(5)
  })

  test("deve listar expedientes distribuídos", () => {
    const distribuição = gpinf.listaDistribuidos()
    expect(distribuição).toHaveLength(5)
  })

  test("deve calcular pontuacao media do Gpinf", () => {
    const media = gpinf.pontuacaoMedia()
    expect(media).toBe(2.66)
  })

  test("deve retornar os expedientes de um perito", () => {
    const perito = gpinf.peritos.getByMatricula("9780")
    const lista = gpinf.listByPerito(perito)
    expect(lista).toHaveLength(2)
  })

  test("deve retornar a pontuacao distribuída de um perito", () => {
    const perito = gpinf.peritos.getByMatricula("9780")
    const pontuacao = gpinf.pontuacaoDistribuida(perito)
    expect(pontuacao).toBe(3)
  })

  test.only("deve retornar a lista de expedientes totalizada por tipo e criticidade", () => {
    let lista = gpinf.listaAgrupada()
    expect(lista[0]).toEqual({
      nome: "Clayton Ogawa",
      matricula: "2345",
      carga: [
        {
          tipo: "Extração Automatizada",
          expedientes: [
            {
              criticidade: "ALTA",
              quantidade: 1,
              pontuacao: 1,
            },
          ],
        },
      ],
    })
    expect(lista[1]).toEqual({
      nome: "Rafael Queiroz",
      matricula: "12581",
      carga: [
        {
          tipo: "Extração Automatizada",
          expedientes: [
            {
              criticidade: "BAIXA",
              quantidade: 1,
              pontuacao: 2,
            },
          ],
        },
        {
          tipo: "Análise de Conteúdo",
          expedientes: [
            {
              criticidade: "BAIXA",
              quantidade: 1,
              pontuacao: 2,
            },
          ],
        },
      ],
    })
    expect(lista[2]).toEqual({
      nome: "Weber Rener Paiva",
      matricula: "9780",
      carga: [
        {
          tipo: "Extração Automatizada",
          expedientes: [
            {
              criticidade: "ALTA",
              quantidade: 1,
              pontuacao: 2,
            },
            {
              criticidade: "BAIXA",
              quantidade: 1,
              pontuacao: 1,
            },
          ],
        },
      ],
    })
    const perito = gpinf.peritos.getByMatricula("9780")
    const listaNaoDistribuidos = gpinf.listByStatus(Status.AGUARDANDO_DISTRIBUICAO)
    listaNaoDistribuidos[0].addMovimentacao(perito)
    lista = gpinf.listaAgrupada()
    expect(lista[2].carga).toHaveLength(2)
    listaNaoDistribuidos[1].addMovimentacao(perito)
    lista = gpinf.listaAgrupada()
    expect(lista[2].carga).toHaveLength(2)
    expect(lista[2]).toEqual({
      nome: "Weber Rener Paiva",
      matricula: "9780",
      carga: [
        {
          tipo: "Extração Automatizada",
          expedientes: [
            {
              criticidade: "ALTA",
              quantidade: 2,
              pontuacao: 5,
            },
            {
              criticidade: "BAIXA",
              quantidade: 1,
              pontuacao: 1,
            },
          ],
        },
        {
          tipo: "Análise de Conteúdo",
          expedientes: [
            {
              criticidade: "ALTA",
              quantidade: 1,
              pontuacao: 1,
            },
          ],
        },
      ],
    })
  })
})
