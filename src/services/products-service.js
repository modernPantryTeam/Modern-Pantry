import axios from "axios";
import authService from "./auth-service";

const apiUrl = "https://localhost:7183";

class productsService {
	async addProduct(name, pantryId, unit, amount, date, category) {
		var data = JSON.stringify({
			name: name,
			pantryId: pantryId,
			unit: unit,
			amount: amount,
			date: date,
			category: category,
		});

		return await axios
			.post(apiUrl + "/api/Product/CreateProduct", data, {
				withCredentials: true,
				headers: {
					Authorization: "Bearer " + authService.getToken(),
					"Content-Type": "application/json",
				},
			})
			.then(response => {
                console.log(response.data)
				return response.data;
			});
	}
}

export default new productsService();
