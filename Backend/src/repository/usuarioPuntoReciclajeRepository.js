import PuntoReciclaje from '../models/puntoReciclaje.js'
import Usuario from '../models/usuario.js';
import UsuarioPuntoReciclaje from '../models/usuarioPuntoReciclaje.js';

const findAll = async () => {
    try {
        const result = await UsuarioPuntoReciclaje.findAll({include: [Usuario, PuntoReciclaje]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await UsuarioPuntoReciclaje.findOne({
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

const create = async (usuarioPuntoReciclaje) => {
    try {

        const newUsuarioPuntoReciclaje = await UsuarioPuntoReciclaje.create(usuarioPuntoReciclaje);

        return newUsuarioPuntoReciclaje;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await UsuarioPuntoReciclaje.destroy({
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

const update = async (usuarioPuntoReciclaje) => {
    try {
        const foundUsuarioPuntoReciclaje =  await UsuarioPuntoReciclaje.findOne({
            where: {
                id: usuarioPuntoReciclaje.id
            }
        })
  
        foundUsuarioPuntoReciclaje.set(usuarioPuntoReciclaje)
  
        foundUsuarioPuntoReciclaje.save()
  
        return foundUsuarioPuntoReciclaje;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioPuntoReciclajeRepository = { findAll, findOne, create, remove, update};

export default UsuarioPuntoReciclajeRepository; 
