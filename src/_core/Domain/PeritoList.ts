import List from "@/Shared/Domain/Entities/List"
import Perito from "./Perito"

export default class PeritoList extends List<Perito> {
  private constructor(peritos: Perito[]) {
    super(peritos)
  }

  static create(peritos: Perito[]) {
    return new PeritoList(peritos)
  }

  override exists(item: Perito): boolean {
    const existe = this.items.find((perito) => perito.matricula === item.matricula)
    return existe ? true : false
  }

  override add(perito: Perito) {
    if (this.exists(perito)) throw new Error("Este perito já pertence ao GPINF!")

    this.items.push(perito)

    this.items = this.items.sort((a: any, b: any) => {
      if (a.nome < b.nome) return -1
      if (a.nome > b.nome) return 1
      return 0
    })
  }

  getByMatricula(matricula: string): Perito {
    const perito = this.getItems().find((perito) => perito.matricula === matricula)
    if (!perito) {
      throw new Error(`A matrícula "${matricula}" não existe no Gpinf!`)
    }
    return perito
  }
}
