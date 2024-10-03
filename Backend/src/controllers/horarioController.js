import HorariosRepository from "../repository/horarioRepository.js";

const findAll = async (req, res) => {
    const result = await HorariosRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await HorariosRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const result = await HorariosRepository.create(req.body);

    return sendResponse(result, res);
}


const remove = async (req, res) => {

    const id = req.params.id;

    const result = await HorariosRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await HorariosRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const HorarioController = { findAll, create, findOne, remove, update }

export default HorarioController;