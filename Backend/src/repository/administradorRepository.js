import Administrador from '../models/administrador.js';


const findAll = async () => {
    try {
        const result = await Administrador.findAll();
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Administrador.findOne({
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

const create = async (administrador) => {
    try {

        const newAdministrador = await Administrador.create(administrador);

        return newAdministrador;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Administrador.destroy({
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

const update = async (administrador) => {
    try {
        const foundAdministrador =  await Administrador.findOne({
            where: {
                id: administrador.id
            }
        })
  
        foundAdministrador.set(administrador)
  
        foundAdministrador.save()
  
        return foundAdministrador;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const AdministradorRepository = { findAll, findOne, create, remove, update};

export default AdministradorRepository; 
