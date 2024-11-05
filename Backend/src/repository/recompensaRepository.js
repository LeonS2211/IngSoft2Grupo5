import Recompensa from '../models/recompensa.js';
import Objetivo from '../models/objetivo.js';

const findAll = async () => {
    try {
        const result = await Recompensa.findAll({include: Objetivo});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Recompensa.findOne({
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

const create = async (recompensa) => {
    try {

        const newRecompensa = await Recompensa.create(recompensa);

        return newRecompensa;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Recompensa.destroy({
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

const update = async (recompensa) => {
    try {
        const foundRecompensa =  await Recompensa.findOne({
            where: {
                id: recompensa.id
            }
        })
  
        foundRecompensa.set(recompensa)
  
        foundRecompensa.save()
  
        return foundRecompensa;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const RecompensaRepository = { findAll, findOne, create, remove, update};

export default RecompensaRepository; 
