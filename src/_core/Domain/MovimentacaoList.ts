import List from "@/Shared/Domain/Entities/List"
import Movimentacao from "./Movimentacao"

export default class MovimentacaoList extends List<Movimentacao> {
  private constructor(movimentacoes: Movimentacao[]) {
    super(movimentacoes)
  }

  static create(movimentacoes: Movimentacao[]) {
    return new MovimentacaoList(movimentacoes)
  }

  override exists(item: Movimentacao): boolean {
    const ultimo = this.getItems()[this.getCount() - 1]
    if (!ultimo) return false
    const existe = ultimo.carga.matricula === item.carga.matricula
    return existe ? true : false
  }

  override add(movimentacao: Movimentacao) {
    if (this.exists(movimentacao)) throw new Error(`O perito matrícula "${movimentacao.carga.matricula}" já é o responsável atual!`)

    this.items.push(movimentacao)
  }
}
