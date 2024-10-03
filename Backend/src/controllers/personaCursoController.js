import PersonaCursosRepository from "../repository/personaCursosRepository.js";
import PersonasRepository from "../repository/personaRepository.js";
import CursosRepository from "../repository/cursoRepository.js";

const findAll = async (req, res) => {
    const result = await PersonaCursosRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await PersonaCursosRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idCurso = req.body.idCurso;
    const idPersona = req.body.idPersona;

    const Curso = await CursosRepository.findOne(idCurso) ?? null;
    const Persona = await PersonasRepository.findOne(idPersona) ?? null;

    let result = null;

    if (Persona && Curso)
        result = await PersonaCursosRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await PersonaCursosRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await PersonaCursosRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const PersonaCursoController = { findAll, create, findOne, remove, update }

export default PersonaCursoController;