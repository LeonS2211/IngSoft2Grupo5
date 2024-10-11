import { IAutenticator } from './IAutenticator';
import { IPerfil } from './IPerfil';

export class Usuario implements IAutenticator, IPerfil {
  private nombre: string;
  private apellido: string;
  private correoElectronico: string;
  private contraseña: string;
  private numTelefono: number;
  private DNI: number;
  private puntajeUsuario: number;
  private objetivos: string[];

  private static instance: Usuario | null = null;

  // Constructor privado para Singleton
  private constructor(
    nombre: string,
    apellido: string,
    correoElectronico: string,
    contraseña: string,
    numTelefono: number,
    DNI: number,
    puntajeUsuario: number,
    objetivos: string[]
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correoElectronico = correoElectronico;
    this.contraseña = contraseña;
    this.numTelefono = numTelefono;
    this.DNI = DNI;
    this.puntajeUsuario = puntajeUsuario;
    this.objetivos = objetivos;
  }

  // Método estático para crear una cuenta (Singleton)
  public static crearCuenta(
    nombre: string,
    apellido: string,
    correoElectronico: string,
    contraseña: string,
    numTelefono: number,
    DNI: number,
    puntajeUsuario: number,
    objetivos: string[]
  ): Usuario {
    if (!Usuario.instance) {
      Usuario.instance = new Usuario(
        nombre,
        apellido,
        correoElectronico,
        contraseña,
        numTelefono,
        DNI,
        puntajeUsuario,
        objetivos
      );
    }
    return Usuario.instance;
  }

  // Implementación de IAutenticator
  public inicioSesion(correo: string, contraseña: string): string {
    if (this.correoElectronico === correo && this.contraseña === contraseña) {
      return `Inicio de sesión exitoso para: ${this.nombre}`;
    } else {
      return 'Credenciales incorrectas.';
    }
  }

  public cerrarSesion(): void {
    Usuario.instance = null;
    console.log('Sesión cerrada exitosamente.');
  }

  // Implementación de IPerfil
  public setPerfil(nombre: string, correoElectronico: string, numTelefono: number): void {
    this.nombre = nombre;
    this.correoElectronico = correoElectronico;
    this.numTelefono = numTelefono;
  }

  public mostrarDetalles(): string {
    return `Usuario: ${this.nombre} ${this.apellido} | Correo: ${this.correoElectronico} | Puntaje: ${this.puntajeUsuario}`;
  }

  // Métodos Getters y Setters
  public getCorreoElectronico(): string {
    return this.correoElectronico;
  }

  public getNombre(): string {
    return this.nombre;
  }

  public getApellido(): string {
    return this.apellido;
  }

  public getContraseña(): string {
    return this.contraseña;
  }

  public getDNI(): number {
    return this.DNI;
  }

  public getNumTelefono(): number {
    return this.numTelefono;
  }

  public getPuntajeUsuario(): number {
    return this.puntajeUsuario;
  }

  public setObjetivos(objetivos: string[]): void {
    this.objetivos = objetivos;
  }

  public setPuntaje(puntaje: number): void {
    this.puntajeUsuario = puntaje;
  }
}
