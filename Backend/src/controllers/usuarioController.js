import UsuarioRepository from "../repository/usuarioRepository.js";

const findAll = async (req, res) => {
    const result = await UsuarioRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UsuarioRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await UsuarioRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UsuarioRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UsuarioRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const UsuarioController = { findAll,  findOne, create, remove, update}

export default UsuarioController;