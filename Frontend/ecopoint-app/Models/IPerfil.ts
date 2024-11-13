// Models/IPerfil.ts
export interface IPerfil {
  setPerfil(
    nombre: string,
    correoElectronico: string,
    contraseña: string
  ): void;
  mostrarDetalles(): string;
}
