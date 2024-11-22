// {id: 1, idUsuario: 1, idAmigo: 2},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Usuario from "./usuario.js"
import Comunidad from "./comunidad.js"

const ComentarioComunidad = sequelize.define('ComentarioComunidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
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

Comunidad.hasMany(ComentarioComunidad, {
    foreignKey: 'idComunidad',
    targetId: 'id'
})
ComentarioComunidad.belongsTo(Comunidad, {
    foreignKey: 'idComunidad',
    targetId: 'id'
})

Usuario.hasMany(ComentarioComunidad, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})
ComentarioComunidad.belongsTo(Usuario, {
    foreignKey: 'idUsuario',
    targetId: 'id'
})

export default ComentarioComunidad