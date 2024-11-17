import CodigoQR from '../models/codigoQR.js'
import Ubicacion from '../models/ubicacion.js'
import PuntoReciclaje from '../models/puntoReciclaje.js'

const findAll = async () => {
    try {
        const result = await PuntoReciclaje.findAll({include: [Ubicacion, CodigoQR]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await PuntoReciclaje.findOne({
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

const create = async (puntoReciclaje) => {
    try {

        const newPuntoReciclaje = await PuntoReciclaje.create(puntoReciclaje);

        return newPuntoReciclaje;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await PuntoReciclaje.destroy({
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

const update = async (puntoReciclaje) => {
    try {
        const foundPuntoReciclaje =  await PuntoReciclaje.findOne({
            where: {
                id: puntoReciclaje.id
            }
        })
  
        foundPuntoReciclaje.set(puntoReciclaje)
  
        foundPuntoReciclaje.save()
  
        return foundPuntoReciclaje;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const PuntoReciclajeRepository = { findAll, findOne, create, remove, update};

export default PuntoReciclajeRepository; 
