import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://fe2e-37-30-108-33.eu.ngrok.io";

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