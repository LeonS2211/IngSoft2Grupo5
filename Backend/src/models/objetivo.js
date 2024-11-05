// {id: 1, idUbicacion: 1, idCodigoQR: 1, nombre: "Universidad de Lima", Descripcion: "cerca del edificio x, contenedor de color gris"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Recompensa from "./recompensa.js"

const Objetivo = sequelize.define('objetivos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idRecompensa: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Recompensa.hasOne(Objetivo, {
    foreignKey: 'idRecompensa',
    targetId: 'id'
})
Objetivo.belongsTo(Recompensa, {
    foreignKey: 'idRecompensa',
    targetId: 'id'
})

export default Objetivo