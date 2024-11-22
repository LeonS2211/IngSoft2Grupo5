// {id: 1, contenido: QRTX9527HJ} 

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Comunidad = sequelize.define('comunidades', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombreComunidad: {
        type: DataTypes.STRING,
        allowNull: false
    }
})


export default Comunidad