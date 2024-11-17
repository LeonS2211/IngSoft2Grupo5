// {id: 1, idUbicacion: 1, idCodigoQR: 1, nombre: "Universidad de Lima", Descripcion: "cerca del edificio x, contenedor de color gris"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Ubicacion from "./ubicacion.js"
import CodigoQR from "./codigoQR.js"

const PuntoReciclaje = sequelize.define('puntoReciclajes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUbicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCodigoQR: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


Ubicacion.hasOne(PuntoReciclaje, {
    foreignKey: 'idUbicacion',
    targetId: 'id'
})
PuntoReciclaje.belongsTo(Ubicacion, {
    foreignKey: 'idUbicacion',
    targetId: 'id'
})

CodigoQR.hasOne(PuntoReciclaje, {
    foreignKey: 'idCodigoQR',
    targetId: 'id'
})
PuntoReciclaje.belongsTo(CodigoQR, {
    foreignKey: 'idCodigoQR',
    targetId: 'id'
})

export default PuntoReciclaje