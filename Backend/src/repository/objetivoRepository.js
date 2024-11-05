import Recompensa from '../models/recompensa.js';
import Objetivo from '../models/objetivo.js';

const findAll = async () => {
    try {
        const result = await Objetivo.findAll({include: Recompensa});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Objetivo.findOne({
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

const create = async (objetivo) => {
    try {

        const newObjetivo = await Objetivo.create(objetivo);

        return newObjetivo;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Objetivo.destroy({
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

const update = async (objetivo) => {
    try {
        const foundObjetivo =  await Objetivo.findOne({
            where: {
                id: objetivo.id
            }
        })
  
        foundObjetivo.set(objetivo)
  
        foundObjetivo.save()
  
        return foundObjetivo;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const ObjetivoRepository = { findAll, findOne, create, remove, update};

export default ObjetivoRepository; 
