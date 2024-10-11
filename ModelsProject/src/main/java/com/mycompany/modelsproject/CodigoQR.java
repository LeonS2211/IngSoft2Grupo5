package com.mycompany.modelsproject;

public class CodigoQR {

    private String codigo;
    private String descripcion;
    private String tipo;
    private String fecha;
    private String hora;
    private String usuario;
    private String puntoReciclaje;
    private String recompensa;
    private String estado;
    private static CodigoQR instance;

    private CodigoQR(String codigo, String descripcion, String tipo, String fecha, String hora, String usuario,
            String puntoReciclaje, String recompensa, String estado) {
        this.codigo = codigo;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.fecha = fecha;
        this.hora = hora;
        this.usuario = usuario;
        this.puntoReciclaje = puntoReciclaje;
        this.recompensa = recompensa;
        this.estado = estado;
    }

    public static CodigoQR crearCodigoQR(String codigo, String descripcion, String tipo, String fecha, String hora,
            String usuario, String puntoReciclaje, String recompensa, String estado) {
        if (instance == null) {
            instance = new CodigoQR(codigo, descripcion, tipo, fecha, hora, usuario, puntoReciclaje, recompensa,
                    estado);
        }
        return instance;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getTipo() {
        return tipo;
    }

    public String getFecha() {
        return fecha;
    }

    public String getHora() {
        return hora;
    }

    public String getUsuario() {
        return usuario;
    }

    public String getPuntoReciclaje() {
        return puntoReciclaje;
    }

    public String getRecompensa() {
        return recompensa;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public void setFecha(String fecha) {
        this.fecha = fecha;
    }

    public void setHora(String hora) {
        this.hora = hora;

    }
}
