import axios from "axios";
import authService from "./auth-service";
import authHeader from "./auth-header";

const apiUrl = "https://localhost:7045";

class pantryService {

    async createPantry(name) {

        return await axios
            .post(apiUrl + "/api/Pantry/CreatePantry", {
                name,
                headers: {
                    Authorization: 'Bearer ' + authService.getToken()
                }
            }
            ).then(
                response => {
                    return response.data;
                }
            );
    }
}

export default new pantryService();