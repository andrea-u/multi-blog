import { defineStore } from "pinia";
import axios from "../plugins/axios";

const $axios = axios().provide.axios;

export const useArticleStore = defineStore("article", {
	state: () => ({
		articles: [],
		loading: false,
		error: null,
	}),
	actions: {
		async getAllArticles() {
			const query = `
                query AllArticles {
                    allArticles {
                        body
                        id
                        createdAt
                        title
                        slug
                        
                        image {
                            id
                            url
                            title
                        }
                        
                        category {
                            id
                            name
                        }
                    }
                }
            `;

			const { data, error } = await useQuery(query);

			if (error.value) {
				this.error = error.value;
			}

			if (data.value) {
				this.articles = data.value.allArticles.map((article) => ({
					id: article.id,
					title: article.title,
					body: article.body,
					slug: article.slug,
					createdAt: article.createdAt,

					// Categoria
					category_id: article.category.id,
					category_name: article.category.name,

					// Immagine
					image_id: article.image.id,
					image_url: article.image.url,
					image_title: article.image.title,
				}));
				console.log(this.articles);
			}
		},
	},
	// Utilizza lo persisted state di pinia inserito nella nuxt.config
	persist: true,
});
