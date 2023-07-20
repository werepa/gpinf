import Gpinf from "@/Domain/Gpinf"
import { ExpedienteMock } from "./ExpedienteMock"
import { TipoExame } from "@/Shared/Domain/ValueObjects/TipoExame"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"
import { Status } from "@/Shared/Domain/ValueObjects/Status"

describe("ExpedienteMock", () => {
  test("deve criar um mock de Expediente", () => {
    const expediente = ExpedienteMock()
    expect(expediente).toBeDefined()
    expect(expediente.tipo).toBe(TipoExame.EXTRACAO_AUTOMATIZADA)
    expect(expediente.pontuacao).toBeGreaterThan(0)
    expect(expediente.criticidade).toBe(Criticidade.BAIXA)
    expect(expediente.status).toBe(Status.AGUARDANDO_DISTRIBUICAO)
  })

  test("deve criar um mock de Expediente, conforme parâmetros", () => {
    const expedienteProps = {
      tipo: TipoExame.ANALISE_CONTEUDO,
      pontuacao: 2,
      criticidade: Criticidade.ALTA,
    }
    const expediente = ExpedienteMock(expedienteProps)
    expect(expediente.tipo).toBe(expedienteProps.tipo)
    expect(expediente.pontuacao).toBe(expedienteProps.pontuacao)
    expect(expediente.criticidade).toBe(expedienteProps.criticidade)
  })

  test("deve adicionar o expediente ao Gpinf", () => {
    const gpinf = Gpinf.create({})
    expect(gpinf.expedientes.getCount()).toBe(0)
    const expediente = ExpedienteMock({ gpinf })
    expect(gpinf.expedientes.getCount()).toBe(1)
    expect(gpinf.expedientes.getItems()[0]).toEqual(expediente)
  })
})
