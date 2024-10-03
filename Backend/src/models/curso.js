// {id: 1, nombre: "Estructuras de Datos y Algoritmos", idCarrera: 1}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Carrera from "./carrera.js"

const Curso = sequelize.define('cursos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    idCarrera: {
        type: DataTypes.INTEGER
    }
})

Curso.belongsTo(Carrera, {
    foreignKey: 'idCarrera',
    targetId: 'id'
})

Carrera.hasMany(Curso, {
    foreignKey: 'idCarrera',
    targetId: 'id'
})

export default Curso