import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://fe2e-37-30-108-33.eu.ngrok.io";

class summaryService {

	async getPantrySummary(id) {

		return await axios
			.get(apiUrl + "/api/Summary/GetPantrySummary/" + id, {
				withCredentials: true,
				headers: {
					'ngrok-skip-browser-warning' : true,
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				if (response.data.successStatus === true) {
					localStorage.setItem("CurrentPantrySummary", JSON.stringify(response.data));
				}
				return response.data;
			});
	}

	getCurrentSummary() {
		while (localStorage.getItem("CurrentPantrySummary") == null);
		return JSON.parse(localStorage.getItem("CurrentPantrySummary"));
	}
}

export default new summaryService();
