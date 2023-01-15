import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://fe2e-37-30-108-33.eu.ngrok.io";

class notificationsSerivice{
    async getNotifications(){
        return await axios.get(apiUrl + "/api/Notifications/GetUsersNotifications", {
            withCredentials: true,
            headers: {
                'ngrok-skip-browser-warning' : true,
                Authorization: `Bearer ${authService.getToken()}`,
            }
        }).then(response => {
            return response.data
        })
    }
}

export default new notificationsSerivice();