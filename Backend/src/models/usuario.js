// {id: 1, email: "broder@gmail.com", contraseña: "1234", puntos: 0, codigoAmistad:"ABCD1234EF"}

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
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false
    },
    puntos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codigoAmistad: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
    },
    msgSoporte: {
        type: DataTypes.STRING,
    },
    puntosObjetivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

export default Usuario