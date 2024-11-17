// {id: 1, idUsuario: 1, idAmigo: 2},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import Objetivo from "./objetivo.js"

const UsuarioObjetivo = sequelize.define('usuarioObjetivos', {
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
    idObjetivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Objetivo.hasMany(UsuarioObjetivo, {
    foreignKey: 'idObjetivo',
    targetId: 'id'
})
UsuarioObjetivo.belongsTo(Objetivo, {
    foreignKey: 'idObjetivo',
    targetId: 'id'
})

Usuario.hasMany(UsuarioObjetivo, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})
UsuarioObjetivo.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

export default UsuarioObjetivo