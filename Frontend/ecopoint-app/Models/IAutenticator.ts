export interface IAutenticator {
  inicioSesion(correo: string, contraseña: string): string;
  cerrarSesion(): void;
}
