import Usuario from '../models/usuario.js'
import SugerenciaPuntoReciclaje from '../models/sugerenciaPuntoReciclaje.js'

const findAll = async () => {
    try {
        const result = await SugerenciaPuntoReciclaje.findAll({include: Usuario});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await SugerenciaPuntoReciclaje.findOne({
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

const create = async (sugerenciaPuntoReciclaje) => {
    try {

        const newSugerenciaPuntoReciclaje = await SugerenciaPuntoReciclaje.create(sugerenciaPuntoReciclaje);

        return newSugerenciaPuntoReciclaje;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await SugerenciaPuntoReciclaje.destroy({
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

const update = async (sugerenciaPuntoReciclaje) => {
    try {
        const foundSugerenciaPuntoReciclaje =  await SugerenciaPuntoReciclaje.findOne({
            where: {
                id: sugerenciaPuntoReciclaje.id
            }
        })
  
        foundSugerenciaPuntoReciclaje.set(sugerenciaPuntoReciclaje)
  
        foundSugerenciaPuntoReciclaje.save()
  
        return foundSugerenciaPuntoReciclaje;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const SugerenciaPuntoReciclajeRepository = { findAll, findOne, create, remove, update};

export default SugerenciaPuntoReciclajeRepository; 
