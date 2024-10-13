import axios from "axios";

const URI = "http://localhost:3001"; //https://backgrupo5-production.up.railway.app

const get = (endpoint) => {
  try {
    const url = URI.concat(endpoint);

    return axios.get(url);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const PromiseApi = { get };

export default PromiseApi;
