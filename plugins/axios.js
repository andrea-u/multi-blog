import axios from "axios";

export default defineNuxtPlugin((NuxtApp) => {
	try {
		// axios.defaults.baseURL = "http://localhost:8000";
		// axios.defaults.baseURL = "https://api-md-alluminio.adokstudio.it";
		axios.defaults.baseURL = "https://api.mdalluminio.com";

		return {
			provide: {
				axios: axios,
			},
		};
	} catch (error) {
		console.error(1, error);
	}
});
