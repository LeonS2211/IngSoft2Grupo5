export class Objetivo {
  descripcion: string;
  numObjetivo: number;

  constructor(descripcion: string, numObjetivo: number) {
    this.descripcion = descripcion;
    this.numObjetivo = numObjetivo;
  }
  public getNombre(): string {
    return this.descripcion;
  }
  public getPuntosReq(): number {
    return this.numObjetivo;
  }
}
