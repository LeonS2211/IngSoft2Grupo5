import { Ubicacion } from "./ubicacionModel";
import { CodigoQR } from "./codigoQRModel";

export class PuntoReciclaje {
  ubicacion: Ubicacion;
  codigoQR: CodigoQR;
  nombre: string;
  descripcion: string;

  constructor(
    ubicacion: Ubicacion,
    codigoQR: CodigoQR,
    nombre: string,
    descripcion: string,
  ) {
    this.ubicacion = ubicacion;
    this.codigoQR = codigoQR;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }

  getCodigoQRContenido(): string {
    return this.codigoQR.contenido;
  }

  getUbicacionCoords(): { latitud: number; longitud: number } {
    return {
      latitud: this.ubicacion.latitud,
      longitud: this.ubicacion.longitud,
    };
  }
}
