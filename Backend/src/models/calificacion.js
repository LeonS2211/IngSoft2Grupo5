// {id: 1, idCita: 1, calificacion: 4.0, comentario: "Buen profe, me ayudo en todo lo que queria"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Cita from "./cita.js"

const Calificacion = sequelize.define('calificaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idCita: {
        type: DataTypes.INTEGER
    },
    calificacion: {
        type: DataTypes.FLOAT
    },
    comentario: {
        type: DataTypes.STRING
    }
})

Calificacion.belongsTo(Cita, {
    foreignKey: 'idCita',
    targetId: 'id'
})

Cita.hasMany(Calificacion, {
    foreignKey: 'idCita',
    targetId: 'id'
})

export default Calificacion