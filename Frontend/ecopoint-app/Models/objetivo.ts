export class Objetivo {
  private nombre: string;
  private descripcion: string;
  private puntajeObjetivo: number;
  private recompensaAsociada: string;
  private estado: boolean = false;
  private recompensa: string = "";
  private refRecompensa: string[][][] = [];
  private idObjetivo: number;

  constructor(
    nombre: string,
    descripcion: string,
    objetivoCumplido: string,
    puntajeObjetivo: number
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.puntajeObjetivo = puntajeObjetivo;
    this.recompensaAsociada = objetivoCumplido;
    this.addRecompensa(
      nombre,
      descripcion,
      objetivoCumplido,
      puntajeObjetivo.toString()
    );
  }

  public addRecompensa(
    nombre: string,
    descripcion: string,
    objetivoCumplido: string,
    puntajeObtenido: string
  ): void {
    if (this.estado) {
      this.recompensa = `${nombre} ${descripcion} ${objetivoCumplido} ${puntajeObtenido}`;
      // Logic to update or resize refRecompensa as necessary
    }
  }

  public setEstado(estado: boolean): void {
    this.estado = estado;
  }

  public getEstado(): boolean {
    return this.estado;
  }

  public getIdObjetivo(): number {
    return this.idObjetivo;
  }

  public setIdObjetivo(id: number): void {
    this.idObjetivo = id;
  }

  public setNombre(nombre: string): void {
    this.nombre = nombre;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public setDescripcion(descripcion: string): void {
    this.descripcion = descripcion;
  }

  public getDescripcion(): string {
    return this.descripcion;
  }

  public setPuntajeObjetivo(puntaje: number): void {
    this.puntajeObjetivo = puntaje;
  }

  public getPuntajeObjetivo(): number {
    return this.puntajeObjetivo;
  }

  public setRecompensaAsociada(recompensa: string): void {
    this.recompensaAsociada = recompensa;
  }

  public getRecompensaAsociada(): string {
    return this.recompensaAsociada;
  }
}
