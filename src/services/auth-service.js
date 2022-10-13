import axios from "axios";
import userService from "./user-service";

const apiUrl = "https://localhost:7045";

class authService {
    async login(username, password) {
        const email = "";
        return await axios.post(apiUrl + "/User/auth/login", {
            username,
            password,
            email
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            return response.data;
        }
        );
    }

    logout() {
        localStorage.removeItem("user");
    }

    async register(username, password, email) {
        return await axios.post(apiUrl + "/User/auth/register", {
            username,
            password,
            email
        });
    }

    getCurrentUser() {
        while(localStorage.getItem("user") == null);
        return JSON.parse(localStorage.getItem("user"));
    }

    loggedIn() {
        if (localStorage.getItem("user") === null) {
            return false;
        }
        return true;
    }

    getToken() {
        const user = this.getCurrentUser();
        return user.token;
    }
}

export default new authService();