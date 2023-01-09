import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

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