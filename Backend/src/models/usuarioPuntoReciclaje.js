// {id: 1, idUsuario: 1, idPuntoReciclaje: 1},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import PuntoReciclaje from "./puntoReciclaje.js"

const UsuarioPuntoReciclaje = sequelize.define('usuarioPuntoReciclajes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    idPuntoReciclaje: {
        type: DataTypes.INTEGER
    }
})

UsuarioPuntoReciclaje.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

UsuarioPuntoReciclaje.belongsTo(PuntoReciclaje, {
    foreignKey: 'idPuntoReciclaje',
    targetId: 'id'
})

Usuario.hasMany(UsuarioPuntoReciclaje, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

PuntoReciclaje.hasMany(UsuarioPuntoReciclaje, {
    foreignKey: 'idPuntoReciclaje',
    targetId: 'id'
})

export default UsuarioPuntoReciclaje