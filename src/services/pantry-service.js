import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class pantryService {
	async createPantry(name) {
		var data = JSON.stringify({
			name: name,
		});
		return await axios
			.post(apiUrl + "/api/Pantry/CreatePantry", data, {
				withCredentials: true,
				headers: {
					Authorization: `Bearer ${authService.getToken()}`,
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				return response.data;
			});

		// var data = JSON.stringify({
		// 	name: name,
		// });

		// var config = {
		// 	method: "post",
		// 	url: "https://localhost:7183/api/Pantry/CreatePantry",
		// 	headers: {
		// 		Authorization: "Bearer " + authService.getToken(),
		// 		"Content-Type": "application/json",
		// 	},
		// 	data: data,
		// };

		// await axios(config).then(response => {
		// 	return response.data;
		// });
	}

	async getPantries() {
		return await axios
			.get(apiUrl + "/api/Pantry/GetUserPantries", {
				withCredentials: true,
				headers: {
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				return response.data;
			});
	}
}

export default new pantryService();
