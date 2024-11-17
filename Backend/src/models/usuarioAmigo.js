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
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idAmigo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Amigo.hasMany(UsuarioAmigo, {
    foreignKey: 'idAmigo',
    as: 'Amigo',
    targetId: 'id'
})
UsuarioAmigo.belongsTo(Amigo, {
    foreignKey: 'idAmigo',
    as: 'Amigo',
    targetId: 'id'
})

Usuario.hasMany(UsuarioAmigo, {
    foreignKey: 'idUsuario',
    as: 'Usuario',
    targetId: 'id'
})
UsuarioAmigo.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    as: 'Usuario',
    targetId: 'id'
})

export default UsuarioAmigo