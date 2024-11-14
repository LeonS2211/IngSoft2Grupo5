import UsuarioRepository from "../repository/usuarioRepository.js";
import RecompensaRepository from "../repository/recompensaRepository.js";
import UsuarioRecompensaRepository from "../repository/usuarioRecompensaRepository.js";

const findAll = async (req, res) => {
    const result = await UsuarioRecompensaRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioRecompensaRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idRecompensa = req.body.idRecompensa;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const Recompensa = await RecompensaRepository.findOne(idRecompensa) ?? null;

    let result = null;

    if (Usuario && Recompensa)
        result = await UsuarioRecompensaRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioRecompensaRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioRecompensaRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioRecompensaController = { findAll, create, findOne, remove, update }

export default UsuarioRecompensaController;