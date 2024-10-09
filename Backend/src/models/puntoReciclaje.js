// {id: 1, idUbicacion: 1, idCodigoQR: 1, nombre: "Universidad de Lima", Descripcion: "cerca del edificio x, contenedor de color gris"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Ubicacion from "./ubicacion.js"
import CodigoQR from "./codigoQR.js"

const puntoReciclaje = sequelize.define('puntoReciclajes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUbicacion: {
        type: DataTypes.INTEGER
    },
    idCodigoQR: {
        type: DataTypes.INTEGER
    },
    nombre: {
        type: DataTypes.STRING
    },
    descripcion: {
        type: DataTypes.STRING
    }
})

Ubicacion.belongsTo(puntoReciclaje, {
    foreignKey: 'idUbicacion',
    targetId: 'id'
})

CodigoQR.belongsTo(puntoReciclaje, {
    foreignKey: 'idCodigoQR',
    targetId: 'id'
})

export default puntoReciclaje