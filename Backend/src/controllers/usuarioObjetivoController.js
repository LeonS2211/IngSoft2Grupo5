import UsuarioRepository from "../repository/usuarioRepository.js";
import ObjetivoRepository from "../repository/objetivoRepository.js";
import UsuarioObjetivoRepository from "../repository/usuarioObjetivoRepository.js";

const findAll = async (req, res) => {
    const result = await UsuarioObjetivoRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioObjetivoRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idObjetivo = req.body.idObjetivo;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const Objetivo = await ObjetivoRepository.findOne(idObjetivo) ?? null;

    let result = null;

    if (Usuario && Objetivo)
        result = await UsuarioObjetivoRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioObjetivoRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioObjetivoRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioObjetivoController = { findAll, create, findOne, remove, update }

export default UsuarioObjetivoController;