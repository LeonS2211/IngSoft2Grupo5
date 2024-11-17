import Usuario from '../models/usuario.js'

const findAll = async () => {
    try {
        const result = await Usuario.findAll();
        console.log(result)
        return result;

    } catch(err) {
        console.error(err)

        return null;
    }
}


const findOne = async (id) => {
    try {
        return await Usuario.findOne({
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

const create = async (usuario) => {
    try {

        const newUsuario = await Usuario.create(usuario);

        return newUsuario;

    } catch(err) {
        console.error(err)

        return null;
    }
}

const remove = async (id) => {
    try {
        await Usuario.destroy({
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

const update = async (usuario) => {
    try {
        const foundUsuario =  await Usuario.findOne({
            where: {
                id: usuario.id
            }
        })
  
        foundUsuario.set(usuario)
  
        foundUsuario.save()
  
        return foundUsuario;
  
    }
    catch(err) {
        console.error(err)
        return null;
    }
  }

const UsuarioRepository = { findAll, findOne, create, remove, update};

export default UsuarioRepository; 
