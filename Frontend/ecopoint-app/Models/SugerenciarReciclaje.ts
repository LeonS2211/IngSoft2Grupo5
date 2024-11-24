export class SugerenciaPuntoReciclaje {
  id?: number; // Generado por el backend
  ubicacionPropuestaLatitud: number;
  ubicacionPropuestaLongitud: number;
  descripcion: string;
  idUsuario: number;
  createdAt?: string; // Asignado automáticamente por la base de datos
  updatedAt?: string; // Asignado automáticamente por la base de datos

  constructor(
    ubicacionPropuestaLatitud: number,
    ubicacionPropuestaLongitud: number,
    descripcion: string,
    idUsuario: number,
    id?: number,
    createdAt?: string,
    updatedAt?: string
  ) {
    this.id = id;
    this.ubicacionPropuestaLatitud = ubicacionPropuestaLatitud;
    this.ubicacionPropuestaLongitud = ubicacionPropuestaLongitud;
    this.descripcion = descripcion;
    this.idUsuario = idUsuario;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  validarDatos() {
    if (!this.ubicacionPropuestaLatitud || !this.ubicacionPropuestaLongitud) {
      throw new Error("Las coordenadas de la ubicación son obligatorias.");
    }
    if (!this.descripcion || this.descripcion.trim() === "") {
      throw new Error("La descripción es obligatoria.");
    }
    if (!this.idUsuario) {
      throw new Error("El ID del usuario es obligatorio.");
    }
  }
}
