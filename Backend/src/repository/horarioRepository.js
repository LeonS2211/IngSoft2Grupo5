import Horario from '../models/horario.js'
import Persona from '../models/persona.js'

const findAll = async () => {
    try {
        const result = await Horario.findAll({include: Persona});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const create = async (horario) => {
    try {

        const newHorario = await Horario.create(horario);

        return newHorario;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const findOne = async (id) => {
    try {
        return await Horario.findOne({
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
        await Horario.destroy({
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

const update = async (horario) => {
    try {
        const foundHorario =  await Horario.findOne({
            where: {
                id: horario.id
            }
        })
  
        foundHorario.set(horario)
  
        foundHorario.save()
  
        return foundHorario;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const horariosRepository = { findAll, create, findOne, remove, update };

export default horariosRepository; 
