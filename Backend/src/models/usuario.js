// {id: 1, email: "broder@gmail.com", contraseña: "1234", puntos: 20, codigoAmistad:"ABCD1234EF"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Usuario = sequelize.define('usuarios', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
    },
    contraseña: {
        type: DataTypes.STRING
    },
    puntos: {
        type: DataTypes.INTEGER
    },
    codigoAmistad: {
        type: DataTypes.STRING(10)
    }
})

export default Usuario