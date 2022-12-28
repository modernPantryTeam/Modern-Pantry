import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class pantryService {
	async createPantry(name) {
		// return await axios
		// 	.post(apiUrl + "/api/Pantry/CreatePantry", name, {
		// 		headers: {
		// 			Authorization: `Bearer ${authService.getToken()}`,
		// 			"Content-Type": "application/json",
		// 		},
		// 	})
		// 	.then(response => {
		// 		return response.data;
		// 	});

		var data = JSON.stringify({
			name: name,
		});

		var config = {
			method: "post",
			url: "https://localhost:7183/api/Pantry/CreatePantry",
			headers: {
				Authorization: "Bearer " + authService.getToken(),
				"Content-Type": "application/json",
			},
			data: data,
		};

		await axios(config).then(response => {
			return response.data;
		});
	}

	async getPantries() {
		return await axios
			.get(apiUrl + "api/Pantry/GetUserPantries", {
				headers: {
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				console.log(response);
				console.log(response.data);
				return response.data;
			});
	}
}

export default new pantryService();
