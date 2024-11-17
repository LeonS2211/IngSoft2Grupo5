import CodigoQR from '../models/codigoQR.js'
import PuntoReciclaje from '../models/puntoReciclaje.js'

const findAll = async () => {
    try {
        const result = await CodigoQR.findAll({include: PuntoReciclaje});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await CodigoQR.findOne({
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

const create = async (codigoQR) => {
    try {

        const newCodigoQR = await CodigoQR.create(codigoQR);

        return newCodigoQR;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await CodigoQR.destroy({
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

const update = async (codigoQR) => {
    try {
        const foundCodigoQR =  await CodigoQR.findOne({
            where: {
                id: codigoQR.id
            }
        })
  
        foundCodigoQR.set(codigoQR)
  
        foundCodigoQR.save()
  
        return foundCodigoQR;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const CodigoQRRepository = { findAll, findOne, create, remove, update};

export default CodigoQRRepository; 
