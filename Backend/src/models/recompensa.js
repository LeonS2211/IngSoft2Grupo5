// {id: 1, idUbicacion: 1, idCodigoQR: 1, nombre: "Universidad de Lima", Descripcion: "cerca del edificio x, contenedor de color gris"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'

const Recompensa = sequelize.define('recompensas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

export default Recompensa