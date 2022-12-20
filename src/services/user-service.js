import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class userService {
    async login() {
        const user = authService.getCurrentUser();
        const userId = user.id;
        return await axios.get(apiUrl + "/api/Account" + userId, authHeader).then(response => {
            if(response.data.name)
                localStorage.setItem("profile", JSON.stringify(response.data));
                
            return response.data;
        }
        );
    }

    async update(username, password, email) {
        return await axios.put(apiUrl + "/api/Account", {
            username,
            password,
            email
        }, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        });

    }

    logout() {
        localStorage.removeItem("profile");
    }

    getCurrentProfile() {
        return JSON.parse(localStorage.getItem("profile"));
    }
}

export default new userService();