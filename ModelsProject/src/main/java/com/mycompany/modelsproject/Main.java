
package com.mycompany.modelsproject;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Usuario usuario = null;
        PuntoReciclaje puntoReciclaje = null;

        while (true) {
            System.out.println("\nSeleccione una opción:");
            System.out.println("1. Gestión de Usuario");
            System.out.println("2. Gestión de Punto de Reciclaje");
            System.out.println("3. Salir");
            int opcionPrincipal = scanner.nextInt();
            scanner.nextLine(); // Limpiar el buffer

            switch (opcionPrincipal) {
                case 1:
                    // Gestión de Usuario
                    while (true) {
                        System.out.println("\nSeleccione una opción de usuario:");
                        System.out.println("1. Crear Cuenta");
                        System.out.println("2. Iniciar Sesión");
                        System.out.println("3. Consultar Puntaje");
                        System.out.println("4. Asignar Recompensa");
                        System.out.println("5. Volver al menú principal");
                        int opcionUsuario = scanner.nextInt();
                        scanner.nextLine(); // Limpiar el buffer

                        switch (opcionUsuario) {
                            case 1:
                                // Crear cuenta
                                System.out.print("Nombre: ");
                                String nombre = scanner.nextLine();
                                System.out.print("Apellido: ");
                                String apellido = scanner.nextLine();
                                System.out.print("Correo Electrónico: ");
                                String correo = scanner.nextLine();
                                System.out.print("Contraseña: ");
                                String contraseña = scanner.nextLine();
                                System.out.print("Número de Teléfono: ");
                                int numTelefono = scanner.nextInt();
                                System.out.print("DNI: ");
                                int DNI = scanner.nextInt();
                                System.out.print("Puntaje Inicial: ");
                                int puntaje = scanner.nextInt();
                                scanner.nextLine(); // Limpiar el buffer

                                String[] objetivos = {}; // Puedes pedir objetivos si lo deseas
                                usuario = Usuario.crearCuenta(nombre, apellido, correo, contraseña, numTelefono, DNI,
                                        puntaje, objetivos);
                                System.out.println("Cuenta creada satisfactoriamente.");
                                break;

                            case 2:
                                // Iniciar sesión
                                if (usuario == null) {
                                    System.out.println("Por favor, crea una cuenta primero.");
                                } else {
                                    System.out.print("Correo Electrónico: ");
                                    String correoLogin = scanner.nextLine();
                                    System.out.print("Contraseña: ");
                                    String contraseñaLogin = scanner.nextLine();
                                    String resultado = usuario.inicioSesion(correoLogin, contraseñaLogin);
                                    System.out.println(resultado);
                                }
                                break;

                            case 3:
                                // Consultar puntaje
                                if (usuario != null) {
                                    System.out.println("Puntaje actual: " + usuario.obtenerPuntaje());
                                } else {
                                    System.out.println("No hay usuario registrado.");
                                }
                                break;

                            case 4:
                                // Asignar recompensa
                                if (usuario != null) {
                                    String recompensa = usuario.asignarRecompensa();
                                    System.out.println("Recompensa asignada: " + recompensa);
                                } else {
                                    System.out.println("No hay usuario registrado.");
                                }
                                break;

                            case 5:
                                // Volver al menú principal
                                break;

                            default:
                                System.out.println("Opción no válida. Intente de nuevo.");
                        }
                        if (opcionUsuario == 5)
                            break; // Salir de la gestión de usuario
                    }
                    break;

                case 2:
                    // Gestión de Punto de Reciclaje
                    while (true) {
                        System.out.println("\nSeleccione una opción de reciclaje:");
                        System.out.println("1. Crear Punto de Reciclaje");
                        System.out.println("2. Agregar Coordenadas");
                        System.out.println("3. Imprimir Información del Punto de Reciclaje");
                        System.out.println("4. Volver al menú principal");
                        int opcionReciclaje = scanner.nextInt();
                        scanner.nextLine(); // Limpiar el buffer

                        switch (opcionReciclaje) {
                            case 1:
                                // Crear nuevo punto de reciclaje
                                System.out.print("Nombre: ");
                                String nombrePunto = scanner.nextLine();
                                System.out.print("Ubicación: ");
                                String ubicacion = scanner.nextLine();
                                System.out.print("Latitud: ");
                                double latitud = scanner.nextDouble();
                                System.out.print("Longitud: ");
                                double longitud = scanner.nextDouble();
                                scanner.nextLine(); // Limpiar el buffer

                                puntoReciclaje = new PuntoReciclaje(opcionReciclaje, nombrePunto, ubicacion,
                                        opcionReciclaje, latitud, longitud);
                                System.out.println("Punto de reciclaje creado satisfactoriamente.");
                                break;

                            case 2:
                                // Agregar coordenadas
                                if (puntoReciclaje != null) {
                                    System.out.print("Latitud: ");
                                    latitud = scanner.nextDouble();
                                    System.out.print("Longitud: ");
                                    longitud = scanner.nextDouble();
                                    scanner.nextLine(); // Limpiar el buffer

                                    puntoReciclaje.addCoordinates(latitud, longitud);
                                    System.out.println("Coordenadas agregadas.");
                                } else {
                                    System.out.println("Primero, debe crear un punto de reciclaje.");
                                }
                                break;

                            case 3:
                                // Imprimir información del punto de reciclaje
                                if (puntoReciclaje != null) {
                                    System.out.println("Nombre: " + puntoReciclaje.getNombre());
                                    System.out.println("Ubicación: " + puntoReciclaje.getUbicacion());

                                    // Obtener e imprimir las coordenadas guardadas
                                    double[][] coordenadas = puntoReciclaje.getRefMapas();
                                    System.out.println("Coordenadas guardadas:");
                                    for (int i = 0; i < coordenadas.length; i++) {
                                        System.out.println("Coordenada " + (i + 1) + ": Latitud " + coordenadas[i][0]
                                                + ", Longitud " + coordenadas[i][1]);
                                    }
                                } else {
                                    System.out.println("No hay punto de reciclaje creado.");
                                }
                                break;

                            case 4:
                                // Volver al menú principal
                                break;

                            default:
                                System.out.println("Opción no válida. Intente de nuevo.");
                        }
                        if (opcionReciclaje == 4)
                            break; // Salir de la gestión de reciclaje
                    }
                    break;

                case 3:
                    // Salir
                    System.out.println("Saliendo...");
                    scanner.close();
                    return;

                default:
                    System.out.println("Opción no válida. Intente de nuevo.");
            }
        }
    }
}
