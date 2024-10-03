// {id: 1, nombre: "Ingenieria de Sistemas", idUniversidad: 1}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Universidad from "./universidad.js"

const Carrera = sequelize.define('carreras', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    idUniversidad: {
        type: DataTypes.INTEGER
    }
})

Carrera.belongsTo(Universidad, {
    foreignKey: 'idUniversidad',
    targetId: 'id'
})

Universidad.hasMany(Carrera, {
    foreignKey: 'idUniversidad',
    targetId: 'id'
})

export default Carrera