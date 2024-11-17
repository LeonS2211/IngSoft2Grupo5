// {id: 1, contenido: QRTX9527HJ} 

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const CodigoQR = sequelize.define('codigosQR', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    contenido: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
})


export default CodigoQR