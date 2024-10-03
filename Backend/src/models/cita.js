// id: 1, idPersonaDocente: 2, idPersonaAlumno: 1, Fecha: "6/07/2023", horainicio: "10:00 am", horafin:"10:30 am", enlaceSesion:"https://www.flaticon.es/icono-gratis/enlace_1063309", estado:"pendiente", idCurso: 1

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import PersonaA from "./persona.js"
import PersonaD from "./persona.js"
import Curso from "./curso.js"

const Cita = sequelize.define('citas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idPersonaDocente: {
        type: DataTypes.INTEGER
    },
    idPersonaAlumno: {
        type: DataTypes.INTEGER
    },
    Fecha: {
        type: DataTypes.DATE
    },
    horainicio: {
        type: DataTypes.STRING
    },
    horafin: {
        type: DataTypes.STRING
    },
    enlaceSesion: {
        type: DataTypes.STRING
    },
    estado: {
        type: DataTypes.STRING
    },
    idCurso: {
        type: DataTypes.INTEGER
    }
})

Cita.belongsTo(PersonaD, {
    foreignKey: 'idPersonaDocente',
    targetId: 'id'
})

Cita.belongsTo(PersonaA, {
    foreignKey: 'idPersonaAlumno',
    targetId: 'id'
})

Cita.belongsTo(Curso, {
    foreignKey: 'idCurso',
    targetId: 'id'
})

PersonaA.hasMany(Cita, {
    foreignKey: 'idPersonaAlumno',
    targetId: 'id'
})

PersonaD.hasMany(Cita, {
    foreignKey: 'idPersonaDocente',
    targetId: 'id'
})

Curso.hasMany(Cita, {
    foreignKey: 'idCurso',
    targetId: 'id'
})

export default Cita