import axios from "axios";

let domain =
  process.env.NODE_ENV === "production" ? "giov.restaurant" : "giov.test";

axios.defaults.baseURL = `https://${domain}/`;

export default axios;
