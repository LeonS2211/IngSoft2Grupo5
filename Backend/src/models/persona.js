// {id: 1,nombre: "Leonardo",apellido:"Salazar",tipoDocumento:"DNI",numeroDocumento:"76569005",idRol: 1,email: "Leo",contraseña: "michi123",idCarrera: 1,tituloPresentacion: "Esta es mi presentacion como alumno",presentacion: "Buenos dias, mi nombre es Leonardo Salazar",foto: "foto"}

import { DataTypes } from "sequelize"
import sequelize from '../config/database.js'
import Rol from "./rol.js"
import Carrera from "./carrera.js"

const Persona = sequelize.define('personas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING
    },
    apellido: {
        type: DataTypes.STRING
    },
    tipoDocumento: {
        type: DataTypes.STRING
    },
    numeroDocumento: {
        type: DataTypes.INTEGER
    },
    idRol: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    contraseña: {
        type: DataTypes.STRING
    },
    idCarrera: {
        type: DataTypes.INTEGER
    },
    tituloPresentacion: {
        type: DataTypes.STRING
    },
    presentacion: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    }
    
})

Persona.belongsTo(Carrera, {
    foreignKey: 'idCarrera',
    targetId: 'id'
})

Persona.belongsTo(Rol, {
    foreignKey: 'idRol',
    targetId: 'id'
})

Carrera.hasMany(Persona, {
    foreignKey: 'idCarrera',
    targetId: 'id'
})

Rol.hasMany(Persona, {
    foreignKey: 'idRol',
    targetId: 'id'
})

export default Persona