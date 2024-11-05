import RecompensaRepository from "../repository/recompensaRepository.js";
import ObjetivoRepository from "../repository/objetivoRepository.js";

const findAll = async (req, res) => {
    const result = await ObjetivoRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await ObjetivoRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idRecompensa = req.body.idRecompensa;

    const Recompensa = await RecompensaRepository.findOne(idRecompensa) ?? null;

    let result = null;

    if (Recompensa)
        result = await ObjetivoRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await ObjetivoRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await ObjetivoRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const ObjetivoController = { findAll, create, findOne, remove, update }

export default ObjetivoController;