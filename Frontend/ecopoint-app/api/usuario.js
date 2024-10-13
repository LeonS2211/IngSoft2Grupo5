import Base from "./base";

const endpoint = "/usuario";

const create = async (request) => {
  return await Base.post(endpoint, request);
};

const findAll = async () => {
  return await Base.get(endpoint);
};

const findOne = async (id) => {
  const newEndpoint = endpoint.concat("/", id);
  return await Base.get(newEndpoint);
};

const update = async (request) => {
  return await Base.put(endpoint, request);
};

const remove = async (id) => {
  const newEndpoint = endpoint.concat("/", id);
  return await Base.remove(newEndpoint);
};

const verifyEmail = async (email) => {
  const newEndpoint = endpoint.concat("/verificar-correo/", email);
  return await Base.get(newEndpoint);
};

const UsuariosApi = { create, findAll, findOne, update, remove, verifyEmail };

export default UsuariosApi;
