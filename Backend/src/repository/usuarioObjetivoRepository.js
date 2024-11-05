import Objetivo from '../models/objetivo.js'
import Usuario from '../models/usuario.js';
import UsuarioObjetivo from '../models/usuarioObjetivo.js';

const findAll = async () => {
    try {
        const result = await UsuarioObjetivo.findAll({include: [Usuario, Objetivo]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await UsuarioObjetivo.findOne({
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

const create = async (usuarioObjetivo) => {
    try {

        const newUsuarioObjetivo = await UsuarioObjetivo.create(usuarioObjetivo);

        return newUsuarioObjetivo;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await UsuarioObjetivo.destroy({
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

const update = async (usuarioObjetivo) => {
    try {
        const foundUsuarioObjetivo =  await UsuarioObjetivo.findOne({
            where: {
                id: usuarioObjetivo.id
            }
        })
  
        foundUsuarioObjetivo.set(usuarioObjetivo)
  
        foundUsuarioObjetivo.save()
  
        return foundUsuarioObjetivo;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioObjetivoRepository = { findAll, findOne, create, remove, update};

export default UsuarioObjetivoRepository; 
