import List from "@/Shared/Domain/Entities/List"
import Expediente from "./Expediente"

export default class ExpedienteList extends List<Expediente> {
  private constructor(expedientes: Expediente[]) {
    super(expedientes)
  }

  static create(expedientes: Expediente[]) {
    return new ExpedienteList(expedientes)
  }
}
