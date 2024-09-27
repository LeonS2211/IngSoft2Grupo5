package com.mycompany.modelsproject;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Usuario usuario = null;

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
        usuario = Usuario.crearCuenta(nombre, apellido, correo, contraseña, numTelefono, DNI, puntaje, objetivos);
        System.out.println("Cuenta creada satisfactoriamente.");

        // Iniciar sesión
        System.out.print("Correo Electrónico: ");
        String correoLogin = scanner.nextLine();
        System.out.print("Contraseña: ");
        String contraseñaLogin = scanner.nextLine();
        String resultado = usuario.inicioSesion(correoLogin, contraseñaLogin);
        System.out.println(resultado);

        scanner.close();
    }
}
