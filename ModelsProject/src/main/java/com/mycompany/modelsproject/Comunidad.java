package com.mycompany.modelsproject;

public class Comunidad {
    private int idComunidad;
    private String contenido;
    private int idcomentario;
    private date fechaPublicacion;

    public Comunidad(int idComunidad, String contenido, int idcomentario, date fechaPublicacion, Usuario usuario) {
        this.idComunidad = idComunidad;
        this.contenido = contenido;
        this.idcomentario = idcomentario;
        this.fechaPublicacion = fechaPublicacion;
    }
}
// public void getComentarios() {
// return comentarios;
// }

// public void obtenerReacciones() {
// return reacciones;
// }

// public void obtenerPublicaciones() {
// return publicaciones;
// }
