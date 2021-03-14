import axios from "axios";

let domain =
  process.env.NODE_ENV === "production"
    ? "api.giov.restaurant"
    : "api.giov.test";

axios.defaults.baseURL = `https://${domain}/`;

export default axios;
