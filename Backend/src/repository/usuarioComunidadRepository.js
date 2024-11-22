import Comunidad from '../models/comunidad.js'
import Usuario from '../models/usuario.js';
import UsuarioComunidad from '../models/usuarioComunidad.js';

const findAll = async () => {
    try {
        const result = await UsuarioComunidad.findAll({include: [Usuario, Comunidad]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await UsuarioComunidad.findOne({
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

const create = async (usuarioComunidad) => {
    try {

        const newUsuarioComunidad = await UsuarioComunidad.create(usuarioComunidad);

        return newUsuarioComunidad;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await UsuarioComunidad.destroy({
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

const update = async (usuarioComunidad) => {
    try {
        const foundUsuarioComunidad =  await UsuarioComunidad.findOne({
            where: {
                id: usuarioComunidad.id
            }
        })
  
        foundUsuarioComunidad.set(usuarioComunidad)
  
        foundUsuarioComunidad.save()
  
        return foundUsuarioComunidad;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioComunidadRepository = { findAll, findOne, create, remove, update};

export default UsuarioComunidadRepository; 
