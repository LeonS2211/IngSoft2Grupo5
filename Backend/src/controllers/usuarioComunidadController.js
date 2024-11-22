import UsuarioRepository from "../repository/usuarioRepository.js";
import ComunidadRepository from "../repository/comunidadRepository.js";
import UsuarioComunidadRepository from "../repository/usuarioComunidadRepository.js";

const findAll = async (req, res) => {
    const result = await UsuarioComunidadRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioComunidadRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idComunidad = req.body.idComunidad;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const Comunidad = await ComunidadRepository.findOne(idComunidad) ?? null;

    let result = null;

    if (Usuario && Comunidad)
        result = await UsuarioComunidadRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioComunidadRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioComunidadRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioComunidadController = { findAll, create, findOne, remove, update }

export default UsuarioComunidadController;