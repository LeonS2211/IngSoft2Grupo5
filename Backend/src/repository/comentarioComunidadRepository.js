import Comunidad from '../models/comunidad.js'
import Usuario from '../models/usuario.js';
import ComentarioComunidad from '../models/comentarioComunidad.js';

const findAll = async () => {
    try {
        const result = await ComentarioComunidad.findAll({include: [Usuario, Comunidad]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await ComentarioComunidad.findOne({
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

const create = async (comentarioComunidad) => {
    try {

        const newComentarioComunidad = await ComentarioComunidad.create(comentarioComunidad);

        return newComentarioComunidad;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await ComentarioComunidad.destroy({
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

const update = async (comentarioComunidad) => {
    try {
        const foundComentarioComunidad =  await ComentarioComunidad.findOne({
            where: {
                id: comentarioComunidad.id
            }
        })
  
        foundComentarioComunidad.set(comentarioComunidad)
  
        foundComentarioComunidad.save()
  
        return foundComentarioComunidad;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const ComentarioComunidadRepository = { findAll, findOne, create, remove, update};

export default ComentarioComunidadRepository; 
