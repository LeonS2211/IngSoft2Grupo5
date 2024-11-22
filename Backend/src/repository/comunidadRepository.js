import Comunidad from '../models/comunidad.js';

const findAll = async () => {
    try {
        const result = await Comunidad.findAll();
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Comunidad.findOne({
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

const create = async (comunidad) => {
    try {

        const newComunidad = await Comunidad.create(comunidad);

        return newComunidad;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Comunidad.destroy({
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

const update = async (comunidad) => {
    try {
        const foundComunidad =  await Comunidad.findOne({
            where: {
                id: comunidad.id
            }
        })
  
        foundComunidad.set(comunidad)
  
        foundComunidad.save()
  
        return foundComunidad;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const ComunidadRepository = { findAll, findOne, create, remove, update};

export default ComunidadRepository; 
