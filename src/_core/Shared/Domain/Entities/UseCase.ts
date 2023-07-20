export default interface UseCase<T> {
  execute(dto?: any): Promise<T | any>
}
