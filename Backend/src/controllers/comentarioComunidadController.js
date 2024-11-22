import UsuarioRepository from "../repository/usuarioRepository.js";
import ComunidadRepository from "../repository/comunidadRepository.js";
import ComentarioComunidadRepository from "../repository/comentarioComunidadRepository.js";

const findAll = async (req, res) => {
    const result = await ComentarioComunidadRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await ComentarioComunidadRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idComunidad = req.body.idComunidad;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const Comunidad = await ComunidadRepository.findOne(idComunidad) ?? null;

    let result = null;

    if (Usuario && Comunidad)
        result = await ComentarioComunidadRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await ComentarioComunidadRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await ComentarioComunidadRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const ComentarioComunidadController = { findAll, create, findOne, remove, update }

export default ComentarioComunidadController;