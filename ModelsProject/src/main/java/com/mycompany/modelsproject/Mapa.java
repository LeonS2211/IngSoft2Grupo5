/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */
/**
 *
 * @author Alonso
 */
package com.mycompany.modelsproject;

public class Mapa {
    private double latitud;
    private double longitud;

    public Mapa(double latitud, double longitud) {
        this.latitud = latitud;
        this.longitud = longitud;
    }

    // -------------------Getters and Setter-------------------//
    public double getLatitud() {
        return latitud;
    }

    public double getLongitud() {
        return longitud;
    }
}