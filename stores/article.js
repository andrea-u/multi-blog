import { defineStore } from "pinia";

export const useArticleStore = defineStore("article", {
	state: () => ({
		articles: [],
		loading: false,
		error: null,
	}),
	actions: {
		// Funzione per il richiamo degli articoli
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
					// Articolo
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
			}
		},
	},
	// Utilizza lo persisted state di pinia inserito nella nuxt.config
	persist: true,
});
