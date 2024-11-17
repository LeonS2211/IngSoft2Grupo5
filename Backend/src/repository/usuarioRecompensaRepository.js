import Recompensa from '../models/recompensa.js'
import Usuario from '../models/usuario.js';
import UsuarioRecompensa from '../models/usuarioRecompensa.js';

const findAll = async () => {
    try {
        const result = await UsuarioRecompensa.findAll({include: [Usuario, Recompensa]});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await UsuarioRecompensa.findOne({
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

const create = async (usuarioRecompensa) => {
    try {

        const newUsuarioRecompensa = await UsuarioRecompensa.create(usuarioRecompensa);

        return newUsuarioRecompensa;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await UsuarioRecompensa.destroy({
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

const update = async (usuarioRecompensa) => {
    try {
        const foundUsuarioRecompensa =  await UsuarioRecompensa.findOne({
            where: {
                id: usuarioRecompensa.id
            }
        })
  
        foundUsuarioRecompensa.set(usuarioRecompensa)
  
        foundUsuarioRecompensa.save()
  
        return foundUsuarioRecompensa;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioRecompensaRepository = { findAll, findOne, create, remove, update};

export default UsuarioRecompensaRepository; 
