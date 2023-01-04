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

	async deletePantry(id) {
		var data = JSON.stringify({
			id: id,
		});
		return await axios.delete(apiUrl + "/api/Pantry/DeletePantry/" + id, data, {
			withCredentials: true,
			headers: {
				Authorization: "Bearer " + authService.getToken(),
				"Content-Type": "application/json",
			},
		}).then(response => {
			return response.data;
		});
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

	async getQR(url) {

			return await axios
				.get(apiUrl + "/api/QR" + url, {
					url,
					withCredentials: true,
					headers: {
						Authorization: "Bearer " + authService.getToken(),
					},
				})
				.then(response => {
					if (response.data.successStatus === true) {
						localStorage.setItem("QR", JSON.stringify(response.data));
					}
					return response.data;
				});
		}

		getCurrentPantryQR() {
			while (localStorage.getItem("QR") == null);
			return JSON.parse(localStorage.getItem("QR"));
		}

	async invite(email, pantryID) {
			var data = JSON.stringify({
				email: email,
				pantryID: pantryID
			});
			return await axios.post(apiUrl + "/api/PantryInvites/SendInvite?inviteRecieverEmail=" + email + "&pantryId=" + pantryID, data, {
				withCredentials: true,
				headers: {
					Authorization: "Bearer " + authService.getToken(),
					"Content-Type": "application/json",
				},
			}).then(response => {
				return response.data;
			});
		}
	}

export default new pantryService();
