import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://1e05-37-30-108-33.eu.https://a187-37-30-108-33.eu.ngrok.io.io";

class userService {

    async update(password, email, username) {
        return await axios.put(apiUrl + "/api/Account/Update", {
            username,
            email,
            password
        }, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        });
    }
}

export default new userService();