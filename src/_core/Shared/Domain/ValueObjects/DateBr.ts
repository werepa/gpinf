import { DiaSemana } from "./DiaSemana"

export default class DateBr extends Date {
  private _data: Date

  private constructor(private data: Date) {
    super(data)
    this._data = new Date(data)
  }

  static create(data?: Date | string) {
    if (!data) return new DateBr(new Date())
    if (data instanceof String) return new DateBr(new Date(data))
    if (data instanceof DateBr) return new DateBr(data.value)
    return new DateBr(data as Date)
  }

  get formatoBr() {
    const dia = this._data.getDate()
    const mes = this._data.getMonth() + 1
    const ano = this._data.getFullYear()

    const dataFormatada = dia.toString().padStart(2, "0") + "/" + mes.toString().padStart(2, "0") + "/" + ano.toString()

    return dataFormatada
  }

  get diaSemana() {
    return DiaSemana[this._data.getDay()]
  }

  get value() {
    return this._data
  }

  somaDias(dias: number) {
    this._data.setDate(this._data.getDate() + dias)
    return new DateBr(this._data)
  }

  intervalo(_data2: Date): number {
    const data2 = DateBr.create(_data2)
    const day_ms = 24 * 60 * 60 * 1000 // Número de milissegundos em um dia
    const diferenca_ms = data2.value.getTime() - this._data.getTime() // Diferença em milissegundos

    return Math.round(diferenca_ms / day_ms) // Converter para dias e arredondar
  }
}
