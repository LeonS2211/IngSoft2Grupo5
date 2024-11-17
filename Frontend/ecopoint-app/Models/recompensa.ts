export class Recompensa {
  private nombre: string;
  private descripcion: string;
  private objetivoCumplido: string;
  private puntajeObtenido: string;

  constructor(
    nombre: string,
    descripcion: string,
    objetivoCumplido: string,
    puntajeObtenido: string
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.objetivoCumplido = objetivoCumplido;
    this.puntajeObtenido = puntajeObtenido;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public getObjetivoCumplido(): string {
    return this.objetivoCumplido;
  }

  public setObjetivoCumplido(objetivoCumplido: string): void {
    this.objetivoCumplido = objetivoCumplido;
  }

  public getPuntajeObtenido(): string {
    return this.puntajeObtenido;
  }

  public setPuntajeObtenido(puntajeObtenido: string): void {
    this.puntajeObtenido = puntajeObtenido;
  }
}
