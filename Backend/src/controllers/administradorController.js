import AdministradorRepository from "../repository/administradorRepository.js";

const findAll = async (req, res) => {
    const result = await AdministradorRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await AdministradorRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await AdministradorRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await AdministradorRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await AdministradorRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const AdministradorController = { findAll,  findOne, create, remove, update}

export default AdministradorController;