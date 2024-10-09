// {id: 1, idUsuario: 1, idAmigo: 2},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import Amigo from "./usuario.js"

const UsuarioAmigo = sequelize.define('usuarioAmigos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idUsuario: {
        type: DataTypes.INTEGER
    },
    idAmigo: {
        type: DataTypes.INTEGER
    }
})

UsuarioAmigo.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

UsuarioAmigo.belongsTo(Amigo, {
    foreignKey: 'idAmigo',
    targetId: 'id'
})

Usuario.hasMany(UsuarioAmigo, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

Amigo.hasMany(UsuarioAmigo, {
    foreignKey: 'idAmigo',
    targetId: 'id'
})

export default UsuarioAmigo