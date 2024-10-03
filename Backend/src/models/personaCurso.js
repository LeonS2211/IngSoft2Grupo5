// {id: 1, idPersona: 1, idCurso: 1},

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Persona from "./persona.js"
import Curso from "./curso.js"

const PersonaCurso = sequelize.define('personaCursos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersona: {
        type: DataTypes.INTEGER
    },
    idCurso: {
        type: DataTypes.INTEGER
    }
})

PersonaCurso.belongsTo(Persona, {
    foreignKey: 'idPersona',
    targetId: 'id'
})

PersonaCurso.belongsTo(Curso, {
    foreignKey: 'idCurso',
    targetId: 'id'
})

Persona.hasMany(PersonaCurso, {
    foreignKey: 'idPersona',
    targetId: 'id'
})

Curso.hasMany(PersonaCurso, {
    foreignKey: 'idCurso',
    targetId: 'id'
})

export default PersonaCurso