export default class List<T> {
  public items: T[]

  constructor(items?: T[]) {
    this.items = items ?? []
  }

  getItems() {
    return this.items
  }

  getCount() {
    return this.items.length
  }

  add(item: T) {
    if (this.exists(item)) throw new Error("Este item já existe na coleção!")

    this.items.push(item)
  }

  remove(item: T) {
    this.items = this.items.filter((i: any) => i.id !== (item as any).id)
  }

  update(item: T) {
    if (!this.exists(item)) throw new Error("Este item não existe na coleção!")

    this.remove(item)
    this.items.push(item)
  }

  exists(item: T): boolean {
    const existe = this.items.find((i: any) => i.id === (item as any).id)
    return existe ? true : false
  }
}
