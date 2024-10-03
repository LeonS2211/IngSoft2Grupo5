import Rol from '../models/rol.js'
import Persona from '../models/persona.js'

const findAll = async () => {
    try {
        const result = await Rol.findAll({include: Persona});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Rol.findOne({
            where: {
                id
            }
        })
    }
    catch(err) {
        console.error(err)
        return null;
    }
}

const create = async (rol) => {
    try {

        const newRol = await Rol.create(rol);

        return newRol;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Rol.destroy({
            where: {
                id
            }
        })

        return true;
    }
    catch(err) {
        console.error(err)
        return null;
    }        

}

const update = async (rol) => {
    try {
        const foundRol =  await Rol.findOne({
            where: {
                id: rol.id
            }
        })
  
        foundRol.set(rol)
  
        foundRol.save()
  
        return foundRol;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const rolesRepository = { findAll, findOne, create, remove, update};

export default rolesRepository; 
