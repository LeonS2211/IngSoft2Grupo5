import ComunidadRepository from "../repository/comunidadRepository.js";

const findAll = async (req, res) => {
    const result = await ComunidadRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await ComunidadRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await ComunidadRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await ComunidadRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await ComunidadRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const ComunidadController = { findAll, create, findOne, remove, update }

export default ComunidadController;