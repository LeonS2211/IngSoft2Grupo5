import UsuarioAmigoRepository from "../repository/usuarioAmigoRepository.js";
import UsuarioRepository from "../repository/usuarioRepository.js";
import AmigoRepository from "../repository/usuarioRepository.js";


const findAll = async (req, res) => {
    const result = await UsuarioAmigoRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioAmigoRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idAmigo = req.body.idAmigo;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const Amigo = await AmigoRepository.findOne(idAmigo) ?? null;

    let result = null;

    if (Usuario && Amigo && (Usuario != Amigo))
        result = await UsuarioAmigoRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioAmigoRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioAmigoRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioAmigoController = { findAll, create, findOne, remove, update }

export default UsuarioAmigoController;