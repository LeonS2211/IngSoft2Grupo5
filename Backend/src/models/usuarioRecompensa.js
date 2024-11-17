// {id: 1, idUsuario: 1, idAmigo: 2},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import Recompensa from "./recompensa.js"

const UsuarioRecompensa = sequelize.define('usuarioRecompensas', {
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
    idRecompensa: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Recompensa.hasMany(UsuarioRecompensa, {
    foreignKey: 'idRecompensa',
    targetId: 'id'
})
UsuarioRecompensa.belongsTo(Recompensa, {
    foreignKey: 'idRecompensa',
    targetId: 'id'
})

Usuario.hasMany(UsuarioRecompensa, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})
UsuarioRecompensa.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

export default UsuarioRecompensa