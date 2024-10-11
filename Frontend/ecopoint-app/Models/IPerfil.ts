// Models/IPerfil.ts
export interface IPerfil {
    setPerfil(nombre: string, correoElectronico: string, numTelefono: number): void;
    mostrarDetalles(): string;
  }