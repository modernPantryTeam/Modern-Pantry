import axios from "axios";
import authService from "./auth-service";
import authHeader from "./auth-header";

const apiUrl = "https://localhost:7045";

class postService {
    async createPost(title, description, file, fileName) {
        const user = authService.getCurrentUser();
        const userId = user.id;
        const userName = user.username;
        const formData = new FormData();
        
        formData.append("FormFile", file);
        formData.append("UserId", userId);
        formData.append("UserName", userName);
        formData.append("FileName", fileName);
        formData.append("Title", title);
        formData.append("Description", description);

        console.warn(authHeader());
        return await axios.post(apiUrl + "/Post", formData, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        }).then(
            response => {
                return response.data;
            }
        );
    }

    async getCurrentPosts() {
        const user = authService.getCurrentUser();
        const userId = user.id;

        return await axios.get(apiUrl + "/Post/User/" + userId, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        });
        
    }

    async getPosts() {
        return await axios.get(apiUrl + "/Post", {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        });
    }

    async delete(id) {
        return await axios.delete(apiUrl + "/Post/" + id, {
            headers: {
                Authorization: 'Bearer ' + authService.getToken()
            }
        }).then(
            response => {
                return response.data;
            }
        )
    }
}

export default new postService();