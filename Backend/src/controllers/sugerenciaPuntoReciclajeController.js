import UsuarioRepository from "../repository/usuarioRepository.js";
import SugerenciaPuntoReciclajeRepository from "../repository/sugerenciaPuntoReciclajeRepository.js";

const findAll = async (req, res) => {
    const result = await SugerenciaPuntoReciclajeRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await SugerenciaPuntoReciclajeRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUsuario = req.body.idUsuario;

    const Usuario = await UsuarioRepository.findOne(idUsuario) ?? null;

    let result = null;

    if (Usuario)
        result = await SugerenciaPuntoReciclajeRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await SugerenciaPuntoReciclajeRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await SugerenciaPuntoReciclajeRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const SugerenciaPuntoReciclajeController = { findAll, create, findOne, remove, update }

export default SugerenciaPuntoReciclajeController;