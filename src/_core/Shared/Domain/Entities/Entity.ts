import { randomUUID } from "node:crypto"

export default abstract class Entity<T> {
  protected readonly _id: string
  protected readonly props: T

  constructor(props: T) {
    this._id = (props as any).id ?? randomUUID()
    this.props = props
  }

  get id(): string {
    return this._id
  }
}
