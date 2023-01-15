import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://fe2e-37-30-108-33.eu.ngrok.io";

class pantryService {
	async createPantry(name) {
		var data = JSON.stringify({
			name: name,
		});
		return await axios
			.post(apiUrl + "/api/Pantry/CreatePantry", data, {
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
					Authorization: `Bearer ${authService.getToken()}`,
					"Content-Type": "application/json",
				},
			})
			.then(response => {
				return response.data;
			});
	}

	async deletePantry(id) {
		return await axios.delete(apiUrl + "/api/Pantry/DeletePantry/" + id, {
			withCredentials: true,
			headers: {
				'ngrok-skip-browser-warning' : true,
				Authorization: "Bearer " + authService.getToken(),
				"Content-Type": "application/json",
			},
		}).then(response => {
			window.location.reload()
			return response.data;
		});
	}

	async getPantries() {

		return await axios
			.get(apiUrl + "/api/Pantry/GetUserPantries", {
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				return response.data;
			});
	}

	async getPantryByID(id) {

		return await axios
			.get(apiUrl + "/api/Pantry/GetPantryById/" + id, {
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				if (response.data.successStatus === true) {
					localStorage.setItem("CurrentPantry", JSON.stringify(response.data));
				}
				return response.data;
			});
	}

	getCurrentPantryByID() {
		while (localStorage.getItem("CurrentPantry") == null);
		return JSON.parse(localStorage.getItem("CurrentPantry"));
	}

	async getQR(url) {

		return await axios
			.get(apiUrl + "/api/QR" + url, {
				url,
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
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

	async invite(inviteRecieverUserName, pantryID) {

		var data = JSON.stringify({
			inviteRecieverUserName: inviteRecieverUserName,
			pantryID: pantryID
		});
		return await axios.post(apiUrl + "/api/PantryInvites/SendInvite?inviteRecieverUserName=" + inviteRecieverUserName + "&pantryId=" + pantryID, data, {
			withCredentials: true,
			headers: {
				'ngrok-skip-browser-warning' : true,
				Authorization: "Bearer " + authService.getToken(),
				"Content-Type": "application/json",
			},
		}).then(response => {
			return response.data;
		});
	}

	async getCurrentInvites() {
        return await axios.get(apiUrl + "/api/PantryInvites/GetCurrentInvites", {
            withCredentials: true,
            headers: {
				'ngrok-skip-browser-warning' : true,
                Authorization: `Bearer ${authService.getToken()}`,
            }
        }).then(response => {
            return response.data
        })
    }

	async processInvite(id, status) {
		var data = JSON.stringify({
			id: id,
			status: status
		});
		return await axios
			.post(apiUrl + "/api/PantryInvites/ProcessInvite?inviteId=" + id + "&accept=" + status, data, {
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				window.location.reload()
				return response.data;
			});
	}
}

export default new pantryService();
