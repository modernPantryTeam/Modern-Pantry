import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://1e05-37-30-108-33.eu.https://a187-37-30-108-33.eu.ngrok.io.io";

class notificationsSerivice{
    async getNotifications(){
        return await axios.get(apiUrl + "/api/Notifications/GetUsersNotifications", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${authService.getToken()}`,
            }
        }).then(response => {
            return response.data
        })
    }
}

export default new notificationsSerivice();