export class CodigoQR {
  contenido: string;

  constructor(contenido: string) {
    this.contenido = contenido;
  }
  public getContenido(): string {
    return this.contenido;
  }
}
