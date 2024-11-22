// {id: 1, idUsuario: 1, idAmigo: 2},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import Comunidad from "./comunidad.js"

const UsuarioComunidad = sequelize.define('usuarioComunidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idComunidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Comunidad.hasMany(UsuarioComunidad, {
    foreignKey: 'idComunidad',
    targetId: 'id'
})
UsuarioComunidad.belongsTo(Comunidad, {
    foreignKey: 'idComunidad',
    targetId: 'id'
})

Usuario.hasMany(UsuarioComunidad, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})
UsuarioComunidad.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

export default UsuarioComunidad