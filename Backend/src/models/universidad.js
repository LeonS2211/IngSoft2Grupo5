// {id: 1, descripcion: "Universidad de Lima"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Universidad = sequelize.define('universidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING
    }
})

export default Universidad