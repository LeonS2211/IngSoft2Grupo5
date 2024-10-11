package com.mycompany.modelsproject;

public class Consejo {

    private int idConsejo;
    private String contenido;
    private String titulo;
    private String fechaPublicacion;
    private String horaPublicacion;
    private String usuario;

    public Consejo(int idConsejo, String contenido, String titulo, String fechaPublicacion, String horaPublicacion,
            String usuario) {
        this.idConsejo = idConsejo;
        this.contenido = contenido;
        this.titulo = titulo;
        this.fechaPublicacion = fechaPublicacion;
        this.horaPublicacion = horaPublicacion;
        this.usuario = usuario;
    }

    public void obtenerConsejos() {
        System.out.println("Titulo: " + getTitulo());
        System.out.println("Contenido: " + getContenido());
        System.out.println("Fecha de Publicacion: " + getFechaPublicacion());
        System.out.println("Hora de Publicacion: " + getHoraPublicacion());
    }

    public String getContenido() {
        return contenido;
    }

    public String getTitulo() {
        return titulo;
    }

    public String getFechaPublicacion() {
        return fechaPublicacion;
    }

    public String getHoraPublicacion() {
        return horaPublicacion;
    }

}