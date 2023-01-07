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
			expieryDate: date,
			categoryIds: category,
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
				return response.data;
			});
	}

	async getPantryProducts(id) {

		return await axios
			.get(apiUrl + "/api/Product/GetPantryProducts/" + id, {
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

export default new productsService();