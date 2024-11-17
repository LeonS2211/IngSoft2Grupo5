export class Recompensa {
  nombre: string;
  puntosReq: number;

  constructor(nombre: string, puntosReq: number) {
    this.nombre = nombre;
    this.puntosReq = puntosReq;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getPuntosReq(): number {
    return this.puntosReq;
  }
}
