import Usuario from '../models/usuario.js';
import UsuarioAmigo from '../models/usuarioAmigo.js';

{'Amigo', 'Usuario'}  Usuario;

const findAll = async () => {
    try {
        const result = await UsuarioAmigo.findAll({include: ['Usuario', 'Amigo']});
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await UsuarioAmigo.findOne({
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

const create = async (usuarioAmigo) => {
    try {

        const newUsuarioAmigo = await UsuarioAmigo.create(usuarioAmigo);

        return newUsuarioAmigo;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await UsuarioAmigo.destroy({
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

const update = async (usuarioAmigo) => {
    try {
        const foundUsuarioAmigo =  await UsuarioAmigo.findOne({
            where: {
                id: usuarioAmigo.id
            }
        })
  
        foundUsuarioAmigo.set(usuarioAmigo)
  
        foundUsuarioAmigo.save()
  
        return foundUsuarioAmigo;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioAmigoRepository = { findAll, findOne, create, remove, update};

export default UsuarioAmigoRepository; 
