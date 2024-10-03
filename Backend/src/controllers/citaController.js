import CitasRepository from "../repository/citaRepository.js";
import CursosRepository from "../repository/cursoRepository.js";

const findAll = async (req, res) => {
    const result = await CitasRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await CitasRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idCurso = req.body.idCurso;

    const curso = await CursosRepository.findOne(idCurso) ?? null;

    let result = null;

    if (curso)
        result = await CitasRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await CitasRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await CitasRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const CitaController = { findAll, create, findOne, remove, update }

export default CitaController;