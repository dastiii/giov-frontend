import axios from "axios";

let domain =
  process.env.NODE_ENV === "production"
    ? process.env.REMOTE_API_URL
    : "api.giov.test";

axios.defaults.baseURL = `https://${domain}/`;

export default axios;
