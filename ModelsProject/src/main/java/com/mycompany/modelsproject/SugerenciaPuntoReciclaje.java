
package com.mycompany.modelsproject;

public class SugerenciaPuntoReciclaje {

    private int idSugerencia;
    private String ubicacionPropuesta;
    private boolean estado;

    public SugerenciaPuntoReciclaje(int idSugerencia, String ubicacionPropuesta, Usuario usuario, boolean estado) {
        this.idSugerencia = idSugerencia;
        this.ubicacionPropuesta = ubicacionPropuesta;
        this.estado = estado;
    }
}