import axios from "axios";
import config from "../config.json";

export async function getUser() {
    let response = await axios.get(`${config.domain}/auth/user`, { withCredentials: true });
    return response.data;
}