// {id: 1, latitud: 14.86739, longitud: 64.384692}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Ubicacion = sequelize.define('ubicaciones', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    latitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitud: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
})


export default Ubicacion