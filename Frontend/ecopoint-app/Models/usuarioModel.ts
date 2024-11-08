// usuarioModel.ts
import { IAutenticator } from "./IAutenticator";
import { IPerfil } from "./IPerfil";

export class Usuario implements IAutenticator, IPerfil {
  private nombre: string;
  private apellido: string;
  private correoElectronico: string;
  private contraseña: string;
  private numTelefono: number;
  private puntajeUsuario: number;
  private codigoAmistad: string;

  private static instance: Usuario | null = null;

  private constructor(
    nombre: string,
    apellido: string,
    correoElectronico: string,
    contraseña: string,
    numTelefono: number,
    puntajeUsuario: number,
    codigoAmistad: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correoElectronico = correoElectronico;
    this.contraseña = contraseña;
    this.numTelefono = numTelefono;
    this.puntajeUsuario = puntajeUsuario;
    this.codigoAmistad = codigoAmistad;
  }

  public static crearCuenta(
    nombre: string = "",
    apellido: string = "",
    correoElectronico: string,
    contraseña: string,
    numTelefono: number = 0,
    puntajeUsuario: number = 0
  ): Usuario {
    if (!Usuario.instance) {
      const codigoAmistad = Usuario.generarCodigoAmistad();
      Usuario.instance = new Usuario(
        nombre,
        apellido,
        correoElectronico,
        contraseña,
        numTelefono,
        puntajeUsuario,
        codigoAmistad
      );
    }
    return Usuario.instance;
  }

  private static generarCodigoAmistad(): string {
    return Math.random().toString(36).substring(2, 12);
  }

  public getCodigoAmistad(): string {
    return this.codigoAmistad;
  }

  public getPuntajeUsuario(): number {
    return this.puntajeUsuario;
  }
  public get Nombre(): string {
    return this.nombre;
  }
  public static reclamarRecompensa(
    puntajeUsuario: number,
    puntosCapturadosUserAmigo: number
  ): {
    puntosCapturadosUser: number;
    puntosCapturadosUserAmigo: number;
  } {
    // Actualiza el puntaje del usuario logueado
    puntajeUsuario += 20; // El usuario logueado recibe 20 puntos
    puntosCapturadosUserAmigo += 15; // El amigo recibe 15 puntos

    return {
      puntosCapturadosUser: puntajeUsuario,
      puntosCapturadosUserAmigo,
    };
  }
}
