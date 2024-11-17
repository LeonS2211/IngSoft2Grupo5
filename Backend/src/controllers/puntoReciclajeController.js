import CodigoQRRepository from "../repository/codigoQRRepository.js";
import PuntoReciclajeRepository from "../repository/puntoReciclajeRepository.js";
import UbicacionRepository from "../repository/ubicacionRepository.js";

const findAll = async (req, res) => {
    const result = await PuntoReciclajeRepository.findAll();

    return sendResponse(result, res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await PuntoReciclajeRepository.findOne(id);

    return sendResponse(result, res);
}

const create = async (req, res) => {

    const idUbicacion = req.body.idUbicacion;
    const idCodigoQR = req.body.idCodigoQR;

    const Ubicacion = await UbicacionRepository.findOne(idUbicacion) ?? null;
    const CodigoQR = await CodigoQRRepository.findOne(idCodigoQR) ?? null;

    let result = null;

    if (CodigoQR && Ubicacion)
        result = await PuntoReciclajeRepository.create(req.body);

    return sendResponse(result, res);
}

const remove = async (req, res) => {

    const id = req.params.id;

    const result = await PuntoReciclajeRepository.remove(id)

    return sendResponse(result, res);
}

const update = async (req,res) => {
    const result = await PuntoReciclajeRepository.update(req.body)

    return sendResponse(result, res);
}

const sendResponse = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: 'Ha ocurrido un error'})
} 

const PuntoReciclajeController = { findAll, create, findOne, remove, update }

export default PuntoReciclajeController;