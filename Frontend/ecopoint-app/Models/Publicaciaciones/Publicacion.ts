export class Publicacion {
    constructor(
      public readonly idUsuario: string,
      public readonly contenido: string,
      public readonly fechaCreacion: Date = new Date() // Se asigna la fecha actual automáticamente
    ) {}
  
    // Método para validar el contenido
    validarContenido(): boolean {
      if (this.contenido.length === 0) {
        throw new Error("El contenido no puede estar vacío.");
      }
      return true;
    }
  }
  