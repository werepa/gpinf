import Entity from "@/Shared/Domain/Entities/Entity"
import PeritoList from "./PeritoList"
import ExpedienteList from "./ExpedienteList"
import { Status } from "@/Shared/Domain/ValueObjects/Status"
import Perito from "./Perito"
import Movimentacao from "./Movimentacao"
import { Criticidade } from "@/Shared/Domain/ValueObjects/Criticidade"

interface GpinfProps {
  peritos?: PeritoList
  expedientes?: ExpedienteList
}

export default class Gpinf extends Entity<GpinfProps> {
  private constructor(props: GpinfProps) {
    super(props)
    props.peritos = props.peritos ?? PeritoList.create([])
    props.expedientes = props.expedientes ?? ExpedienteList.create([])
  }

  static create(props: GpinfProps) {
    return new Gpinf(props)
  }

  get peritos() {
    return this.props.peritos
  }

  get expedientes() {
    return this.props.expedientes
  }

  listByStatus(status: Status) {
    return this.expedientes.getItems().filter((expediente) => expediente.status === status)
  }

  listByPerito(perito: Perito) {
    const listaDistribuidos = this.listaDistribuidos()
    const listaPerito = listaDistribuidos.filter((expediente) => {
      const ultimaDistribuicao: Movimentacao = expediente.movimentacoes.getItems()[expediente.movimentacoes.getCount() - 1]
      return ultimaDistribuicao.carga.matricula === perito.matricula
    })
    return listaPerito
  }

  listaDistribuidos() {
    const lista = this.expedientes.getItems().filter((i) => i.status !== Status.AGUARDANDO_DISTRIBUICAO)
    return lista
  }

  pontuacaoMedia() {
    let soma = 0
    const lista = this.listaDistribuidos()
    lista.map((expediente) => {
      soma += expediente.pontuacao
    })
    return this.peritos.getCount() ? formataNumero(soma / this.peritos.getCount()) : 0
  }

  pontuacaoDistribuida(perito: Perito) {
    let soma = 0
    const lista = this.listByPerito(perito)
    lista.map((expediente) => {
      soma += expediente.pontuacao
    })
    return soma
  }

  listaAgrupada() {
    function findResponsavel(expediente) {
      const responsavel = expediente.responsavel()
      let item = result.find((i) => i.matricula === responsavel.matricula)
      if (!item) {
        result.push({
          nome: responsavel.nome,
          matricula: responsavel.matricula,
          carga: [],
        })
      }
      item = result.find((i) => i.matricula === responsavel.matricula)
      return item
    }

    function updateTipoCarga(expediente, item) {
      let tipo = item.carga.find((i) => i.tipo === expediente.tipo)
      if (!tipo) {
        tipo = {
          tipo: expediente.tipo,
          expedientes: [],
        }
        item.carga.push(tipo)
      }
      const itemCriticidade = tipo.expedientes.find((i) => i.criticidade === expediente.criticidade)
      if (!itemCriticidade) {
        tipo.expedientes.push({
          criticidade: expediente.criticidade,
          quantidade: 1,
          pontuacao: expediente.pontuacao,
        })
      } else {
        itemCriticidade.quantidade += 1
        itemCriticidade.pontuacao += expediente.pontuacao
      }
    }

    const result = []
    const lista = this.listaDistribuidos()
    lista.map((expediente) => {
      const item = findResponsavel(expediente)
      updateTipoCarga(expediente, item)
    })
    result.map((i) =>
      i.carga.map((c) =>
        c.expedientes.sort((a, b) => {
          if (a.criticidade === Criticidade.ALTA) return -1
          return 1
        })
      )
    )
    return result.sort((a, b) => {
      if (a.nome < b.nome) return -1
      if (a.nome > b.nome) return 1
      return 0
    })
  }
}

const formataNumero = (numero) => {
  return Math.floor(numero * 100) / 100
}
