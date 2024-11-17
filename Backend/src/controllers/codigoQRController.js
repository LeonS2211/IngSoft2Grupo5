import CodigoQRRepository from "../repository/codigoQRRepository.js";

const findAll = async (req, res) => {
    const result = await CodigoQRRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await CodigoQRRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await CodigoQRRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await CodigoQRRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await CodigoQRRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const CodigoQRController = { findAll, create, findOne, remove, update }

export default CodigoQRController;