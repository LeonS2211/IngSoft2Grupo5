import { IAutenticator } from "./IAutenticator";
import { IPerfil } from "./IPerfil";

export class Usuario implements IAutenticator, IPerfil {
  private nombre: string;
  private apellido: string;
  private correoElectronico: string;
  private contraseña: string;
  private numTelefono: number;
  private puntajeUsuario: number;
  private codigoAmistad: string; // Cambié a singular

  private static instance: Usuario | null = null;

  // Constructor privado para Singleton
  private constructor(
    nombre: string,
    apellido: string,
    correoElectronico: string,
    contraseña: string,
    numTelefono: number,
    puntajeUsuario: number,
    codigoAmistad: string, // Ahora solo un código
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correoElectronico = correoElectronico;
    this.contraseña = contraseña;
    this.numTelefono = numTelefono;
    this.puntajeUsuario = puntajeUsuario;
    this.codigoAmistad = codigoAmistad;
  }

  // Método estático para crear una cuenta (Singleton)
  public static crearCuenta(
    nombre: string = "",
    apellido: string = "",
    correoElectronico: string,
    contraseña: string,
    numTelefono: number = 0,
    puntajeUsuario: number = 0,
  ): Usuario {
    if (!Usuario.instance) {
      const codigoAmistad = Usuario.generarCodigoAmistad(); // Crear un código único

      Usuario.instance = new Usuario(
        nombre,
        apellido,
        correoElectronico,
        contraseña,
        numTelefono,
        puntajeUsuario,
        codigoAmistad,
      );
    }
    return Usuario.instance;
  }

  // Método para generar un código de amistad único
  private static generarCodigoAmistad(): string {
    return Math.random().toString(36).substring(2, 12); // Genera un código de 10 caracteres
  }

  // Obtener el código de amistad
  public getCodigoAmistad(): string {
    return this.codigoAmistad; // Devuelve un único código de amistad
  }

  public inicioSesion(correo: string, contraseña: string): string {
    if (this.correoElectronico === correo && this.contraseña === contraseña) {
      return `Inicio de sesión exitoso para: ${this.nombre}`;
    } else {
      return "Credenciales incorrectas.";
    }
  }

  public cerrarSesion(): void {
    Usuario.instance = null;
    console.log("Sesión cerrada exitosamente.");
  }

  // Implementación de IPerfil
  public setPerfil(
    nombre: string,
    correoElectronico: string,
    numTelefono: number,
  ): void {
    this.nombre = nombre;
    this.correoElectronico = correoElectronico;
    this.numTelefono = numTelefono;
  }

  public mostrarDetalles(): string {
    return `Usuario: ${this.nombre} ${this.apellido} | Correo: ${this.correoElectronico} | Puntaje: ${this.puntajeUsuario}`;
  }

  // Getters y Setters
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

  public getNumTelefono(): number {
    return this.numTelefono;
  }

  public getPuntajeUsuario(): number {
    return this.puntajeUsuario;
  }
}
