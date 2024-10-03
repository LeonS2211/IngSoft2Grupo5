import Universidad from '../models/universidad.js'
import Carrera from '../models/carrera.js'

const findAll = async () => {
    try {
        const result = await Universidad.findAll({include: Carrera});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Universidad.findOne({
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

const create = async (universidad) => {
    try {

        const newUniversidad = await Universidad.create(universidad);

        return newUniversidad;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Universidad.destroy({
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

const update = async (universidad) => {
    try {
        const foundUniversidad =  await Universidad.findOne({
            where: {
                id: universidad.id
            }
        })
  
        foundUniversidad.set(universidad)
  
        foundUniversidad.save()
  
        return foundUniversidad;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const universidadesRepository = { findAll, findOne, create, remove, update};

export default universidadesRepository; 
