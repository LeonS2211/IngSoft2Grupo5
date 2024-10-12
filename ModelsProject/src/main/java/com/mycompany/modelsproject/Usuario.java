package com.mycompany.modelsproject;

import java.util.Random;

public class Usuario {

    private String nombre;
    private String apellido;
    private String correoElectronico;
    private String contraseña;
    private int numTelefono;
    private int DNI;
    private String[] objetivos;
    private int puntaje;
    private static Usuario instance;

    private Usuario(String nombre, String apellido, String correoElectronico, String contraseña, int numTelefono,
            int DNI, int puntaje, String[] objetivos) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correoElectronico = correoElectronico;
        this.contraseña = contraseña;
        this.numTelefono = numTelefono;
        this.DNI = DNI;
        this.puntaje = puntaje;
        this.objetivos = objetivos;
    }

    // Método para crear una cuenta (Singleton)
    public static Usuario crearCuenta(String nombre, String apellido, String correoElectronico, String contraseña,
            int numTelefono, int DNI, int puntaje, String[] objetivos) {
        if (instance == null) {
            instance = new Usuario(nombre, apellido, correoElectronico, contraseña, numTelefono, DNI, puntaje,
                    objetivos);
        }
        return instance;
    }

    // Método para iniciar sesión
    public String inicioSesion(String correo, String contraseña) {
        if (this.correoElectronico.equals(correo) && this.contraseña.equals(contraseña)) {
            return "Inicio de sesión exitoso para: " + nombre;
        } else {
            return "Credenciales incorrectas.";
        }
    }

    // -------------------- Métodos Getters y Setters --------------------
    // Configurar users
    public String getCorreoElectronico() {
        return correoElectronico;
    }

    public void setContraseña(String contraseña) { //
        this.contraseña = contraseña;
    }

    public int obtenerPuntaje() {
        return puntaje;
    }

    public void setPerfil(String nombre, String correoElectronico, int numTelefono) {
        this.nombre = nombre;
        this.correoElectronico = correoElectronico;
        this.numTelefono = numTelefono;
    }

    public void setObjetivos(String[] objetivos) { // Asignar objetivos
        this.objetivos = objetivos;
    }

    public void setPuntaje(int puntaje) { // Asignar puntaje
        this.puntaje = puntaje;
    }

    // -------------------- Métodos de la Clase Usuario --------------------

    // ------------------------------------------------------------------------------

    // Método para asignar recompensa
    public String asignarRecompensa() {
        String recompensa = "";

        if (puntaje < 1000) {
            recompensa = "Recompensa A";
        } else if (puntaje >= 1000 && puntaje < 2000) {
            recompensa = "Recompensa B";
        } else if (puntaje >= 2000 && puntaje < 3000) {
            recompensa = "Recompensa C";
        } else if (puntaje >= 3000 && puntaje < 4000) {
            recompensa = "Recompensa D";
        } else {
            recompensa = "Recompensa E";
        }

        return recompensa;
    }

    // Visualizar Puntos de Reciclaje
    public void visualizarPuntosReciclaje(PuntoReciclaje[] puntosReciclaje) {
        for (PuntoReciclaje punto : puntosReciclaje) {
            System.out.println("Nombre: " + punto.getNombre());
            System.out.println("Ubicación: " + punto.getUbicacion());
            System.out.println("Estadísticas: " + punto.getEstadisticas());
            System.out.println("Fecha de publicacion: " + punto.getFechaPublicacion());
            System.out.println("Coordenadas: ");
            double[][] coordenadas = punto.getRefMapas();
            for (double[] coordenada : coordenadas) {
                System.out.println("Latitud: " + coordenada[0] + ", Longitud: " + coordenada[1]);
            }
            System.out.println();
        }
    }
}

// Creacion de Publicaciones
// public void crearPublicacion(String contenido, int idComentario) {
// if (perteneceAComunidad()) {
// Date fechaPublicacion = new Date();
// Comunidad publicacion = new Comunidad(contenido, idComentario,
// fechaPublicacion);
// publicaciones.add(publicacion);
// } else {
// System.out.println("El usuario no pertenece a ninguna comunidad.");
// }
// }

// Método para verificar si el usuario pertenece a una comunidad
// private boolean perteneceAComunidad() {
// // Lógica para verificar si el usuario pertenece a una comunidad
// // Esto puede ser una comprobación en una lista de comunidades, por ejemplo
// return !comunidades.isEmpty();
// }

// Agregar Reacciones
// public void agregarReaccion(String reaccion) {
// reacciones.add(reaccion);
// }

// Sugerir punto de reciclaje
// public void sugerirPuntoReciclaje(String nombre, String ubicacion, double
// latitud, double longitud) {
// PuntoReciclaje nuevoPunto = new PuntoReciclaje(nombre, ubicacion, latitud,
// longitud);
// puntosReciclaje.add(nuevoPunto);
// }

// Visualizar Consejos
// public void visualizarConsejos() {
// for (String consejo : consejos) {
// System.out.println(consejo);
// }
// }
