// {id: 1, email: "broder@gmail.com", contraseña: "1234", puntos: 0, codigoAmistad:"ABCD1234EF"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Administrador = sequelize.define('administradores', {
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
    }
})

export default Administrador