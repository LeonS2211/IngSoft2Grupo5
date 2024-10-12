
package com.mycompany.modelsproject;

import java.util.Arrays;

public class PuntoReciclaje {

    private int idPuntoReciclaje;
    private String nombre;
    private String ubicacion;
    private double[][] refMapas; // 2D array to store [latitude, longitude] pairs
    private int estadisticas;
    private int count; // Counter to track the number of coordinates added

    // Constructor that initializes the 2D array
    public PuntoReciclaje(int idPuntoReciclaje, String nombre, String ubicacion, int estadisticas, double latitud,
            double longitud) {
        this.idPuntoReciclaje = idPuntoReciclaje;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.estadisticas = estadisticas;
        this.refMapas = new double[1][2]; // Initialize with space for one coordinate pair
        this.count = 0;
        addCoordinates(latitud, longitud); // Add the initial coordinates
    }

    // Method to add a pair of coordinates to the array
    public void addCoordinates(double latitud, double longitud) {
        // If array is full, resize it by creating a new array with an extra row
        if (count >= refMapas.length) {
            refMapas = Arrays.copyOf(refMapas, refMapas.length + 1); // Resize the array
        }
        // Add the new coordinates
        refMapas[count] = new double[] { latitud, longitud };
        count++;
    }

    // Getter for 'idPuntoReciclaje'
    public int getIdPuntoReciclaje() {
        return idPuntoReciclaje;
    }

    public int getEstadisticas() {
        return estadisticas;
    }

    // Getter for 'nombre'
    public String getNombre() {
        return nombre;
    }

    // Getter for 'ubicacion'
    public String getUbicacion() {
        return ubicacion;
    }

    // Getter for the 2D array of coordinates
    public double[][] getRefMapas() {
        return Arrays.copyOf(refMapas, count); // Return only the used portion of the array
    }

    public String getFechaPublicacion() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getFechaPublicacion'");
    }
}
