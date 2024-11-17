import Ubicacion from '../models/ubicacion.js'
import PuntoReciclaje from '../models/puntoReciclaje.js'

const findAll = async () => {
    try {
        const result = await Ubicacion.findAll({include: PuntoReciclaje});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Ubicacion.findOne({
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

const create = async (ubicacion) => {
    try {

        const newUbicacion = await Ubicacion.create(ubicacion);

        return newUbicacion;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Ubicacion.destroy({
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

const update = async (ubicacion) => {
    try {
        const foundUbicacion =  await Ubicacion.findOne({
            where: {
                id: ubicacion.id
            }
        })
  
        foundUbicacion.set(ubicacion)
  
        foundUbicacion.save()
  
        return foundUbicacion;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UbicacionRepository = { findAll, findOne, create, remove, update};

export default UbicacionRepository; 
