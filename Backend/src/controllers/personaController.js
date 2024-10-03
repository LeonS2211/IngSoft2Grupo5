import RolesRepository from "../repository/rolRepository.js";
import CarrerasRepository from "../repository/carreraRepository.js";
import PersonasRepository from "../repository/personaRepository.js";

const findAll = async (req, res) => {
    const result = await PersonasRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await PersonasRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idRol = req.body.idRol;
    const idCarrera = req.body.idCarrera;

    const rol = await RolesRepository.findOne(idRol) ?? null;
    const carrera = await CarrerasRepository.findOne(idCarrera) ?? null;

    let result = null;

    if (rol && carrera)
        result = await PersonasRepository.create(req.body);

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await PersonasRepository.update(req.body)

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await PersonasRepository.remove(id)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const PersonaController = { findAll, create, findOne, update, remove}

export default PersonaController;