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

	async getProductByID(id) {

		return await axios
			.get(apiUrl + "​/api​/Product​/GetProductById​/" + id, {
				withCredentials: true,
				headers: {
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				return response.data;
			});
	}

	async editProduct(name, id, unit, amount, date, category) {
		var data = JSON.stringify({
			name: name,
			id: id,
			unit: unit,
			amount: amount,
			expieryDate: date,
			categoryIds: category,
		});
		return await axios
		.put(apiUrl + "/api/Product/EditProduct", data, {
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

	async deleteProduct(id) {

		return await axios
			.delete(apiUrl + "/api/Product/DeleteProduct/" + id, {
				withCredentials: true,
				headers: {
					Authorization: "Bearer " + authService.getToken(),
				},
			})
			.then(response => {
				window.location.reload();
				return response.data;
			});
	}
}


export default new productsService();