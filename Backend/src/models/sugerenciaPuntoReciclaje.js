// {id: 1, idUbicacion: 1, idCodigoQR: 1, nombre: "Universidad de Lima", Descripcion: "cerca del edificio x, contenedor de color gris"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"

const SugerenciaPuntoReciclaje = sequelize.define('sugerenciaPuntoReciclajes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ubicacionPropuestaLatitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    ubicacionPropuestaLongitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})


Usuario.hasOne(SugerenciaPuntoReciclaje, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})
SugerenciaPuntoReciclaje.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

export default SugerenciaPuntoReciclaje