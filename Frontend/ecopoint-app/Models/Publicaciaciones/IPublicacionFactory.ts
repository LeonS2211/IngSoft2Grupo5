export interface IPublicacionFactory {
    createPublicacion(idUsuario: string, contenido: string): Publicacion;
  }
  