import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class userService {

    async update(username, password, email) {
        return await axios.put(apiUrl + "/api/Account/Update", {
            username,
            password,
            email
        }, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        });

    }
}

export default new userService();