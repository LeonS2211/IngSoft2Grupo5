// {id: 1, idPersona: 2, horainicio: "10:00 am", diaDeLaSemana: "Lunes", horafin: "12:00 am"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Persona from "./persona.js"

const Horario = sequelize.define('horarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersona: {
        type: DataTypes.INTEGER
    },
    horainicio: {
        type: DataTypes.STRING
    },
    diaDeLaSemana: {
        type: DataTypes.STRING
    },
    horafin: {
        type: DataTypes.STRING
    }
})

Horario.belongsTo(Persona, {
    foreignKey: 'idPersona',
    targetId: 'id'
})

Persona.hasMany(Horario, {
    foreignKey: 'idPersona',
    targetId: 'id'
})

export default Horario