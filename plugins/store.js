import { useArticleStore } from "~/stores/article";

export default defineNuxtPlugin((NuxtApp) => {
	return {
		provide: {
			articleStore: useArticleStore(),
		},
	};
});
