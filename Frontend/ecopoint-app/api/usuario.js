import Base from "./base";

const endpoint = "/usuario";

// Crear nuevo usuario
const create = async (request) => {
  return await Base.post(endpoint, request);
};

// Obtener todos los usuarios
const findAll = async () => {
  return await Base.get(endpoint);
};

// Obtener un usuario por ID
const findOne = async (id) => {
  const newEndpoint = endpoint.concat("/", id);
  return await Base.get(newEndpoint);
};

// Actualizar un usuario
const update = async (request) => {
  return await Base.put(endpoint, request);
};

// Eliminar un usuario
const remove = async (id) => {
  const newEndpoint = endpoint.concat("/", id);
  return await Base.remove(newEndpoint);
};

// Verificar si el correo electrónico ya está registrado
const verifyEmail = async (email) => {
  const newEndpoint = endpoint.concat("/verificar-correo/", email);
  return await Base.get(newEndpoint);
};

const UsuariosApi = { create, findAll, findOne, update, remove, verifyEmail };

export default UsuariosApi;
