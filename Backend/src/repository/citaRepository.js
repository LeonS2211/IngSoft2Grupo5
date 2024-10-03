import Cita from '../models/cita.js'
import Curso from '../models/curso.js'

const findAll = async () => {
    try {
        const result = await Cita.findAll({include: Curso});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (cita) => {
    try {

        const newCita = await Cita.create(cita);

        return newCita;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (id) => {
    try {
        return await Cita.findOne({
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


const remove = async (id) => {
    try {
        await Cita.destroy({
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

const update = async (cita) => {
    try {
        const foundCita =  await Cita.findOne({
            where: {
                id: cita.id
            }
        })
  
        foundCita.set(cita)
  
        foundCita.save()
  
        return foundCita;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const CitasRepository = { findAll, create, findOne, remove, update };

export default CitasRepository; 
