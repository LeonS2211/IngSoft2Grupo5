import UsuarioRepository from "../repository/usuarioRepository.js";
import PuntoReciclajeRepository from "../repository/puntoReciclajeRepository.js";
import UsuarioPuntoReciclajeRepository from "../repository/usuarioPuntoReciclajeRepository.js";

const findAll = async (req, res) => {
    const result = await UsuarioPuntoReciclajeRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioPuntoReciclajeRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;
    const idPuntoReciclaje = req.body.idPuntoReciclaje;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;
    const PuntoReciclaje = await PuntoReciclajeRepository.findOne(idPuntoReciclaje) ?? null;

    let result = null;

    if (Usuario && PuntoReciclaje)
        result = await UsuarioPuntoReciclajeRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioPuntoReciclajeRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioPuntoReciclajeRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioPuntoReciclajeController = { findAll, create, findOne, remove, update }

export default UsuarioPuntoReciclajeController;