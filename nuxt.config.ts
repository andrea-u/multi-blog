// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },
	css: ["@/assets/css/tailwind.css"],
	modules: [
		"@nuxtjs/tailwindcss",
		"shadcn-nuxt",
		"@pinia/nuxt",
		"@nuxt/image",
		"@nuxt/icon",
	],
	ssr: false,
	runtimeConfig: {
		public: {
			datocmsApiToken: process.env.DATO_CMS_TOKEN,
		},
	},
});
