import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class summaryService {

	async getPantrySummary(id) {

		return await axios
			.get(apiUrl + "/api/Summary/GetPantrySummary/" + id, {
				withCredentials: true,
				headers: {
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
}

export default new summaryService();
