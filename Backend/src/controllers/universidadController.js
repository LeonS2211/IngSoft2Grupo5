import UniversidadesRepository from "../repository/universidadRepository.js";

const findAll = async (req, res) => {
    const result = await UniversidadesRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await UniversidadesRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await UniversidadesRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await UniversidadesRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await UniversidadesRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
}

const UniversidadController = { findAll, findOne, create, remove, update }

export default UniversidadController;