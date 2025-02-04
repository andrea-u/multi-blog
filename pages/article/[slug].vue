<script setup lang="ts">
	import { StructuredText as DatocmsStructuredText } from "vue-datocms";
	import { h } from "vue";

	import MainLayout from "~/layouts/MainLayout.vue";

	const { $articleStore } = useNuxtApp();
	const route = useRoute();

	const articles = ref([]);
	const article = ref([]);

	const parsedNodes = ref("");
	const isVisible = ref(false);
	const lastScrollTop = ref(0);

	onBeforeMount(() => {
		articles.value = $articleStore.articles;
	});

	onMounted(() => {
		if (articles.value.length > 0) {
			article.value = articles.value.filter(
				(article) => article.slug == route.params.slug
			)[0];

			parsedNodes.value = parseHtml(article.value.body);

			// Rimozione dell'articolo corrente dalla lista degli articoli
			articles.value = articles.value.filter(
				(article) => article.slug !== route.params.slug
			);
		}

		window.addEventListener("scroll", handleScroll);
	});

	onBeforeUnmount(() => {
		if (process.client) {
			window.removeEventListener("scroll", handleScroll);
		}
	});

	// Parser per formattare il testo
	function parseHtml(html) {
		const template = document.createElement("template");
		template.innerHTML = html.trim();

		return Array.from(template.content.childNodes).map((node) => ({
			tag: node.nodeName.toLowerCase(),
			attributes: node.attributes
				? Array.from(node.attributes).reduce((acc, attr) => {
						acc[attr.name] = attr.value;
						return acc;
				  }, {})
				: {},
			content: node.innerHTML || node.textContent,
		}));
	}

	// Gestione dell'ancora
	function handleScroll() {
		const currentScroll = window.scrollY || document.documentElement.scrollTop;

		if (currentScroll > lastScrollTop.value) {
			isVisible.value = false;
		} else {
			isVisible.value = true;
		}
		lastScrollTop.value = currentScroll <= 0 ? 0 : currentScroll;
	}

	function scrollToAnchor() {
		const topElement = document.getElementById("page");
		if (topElement) {
			topElement.scrollIntoView({ behavior: "smooth" });
		}
	}
</script>

<template>
	<MainLayout id="page">
		<div class="mb-2">
			<NuxtLink :to="`/`" class="flex gap-2 hover:underline">
				<Icon
					name="line-md:arrow-left"
					size="16"
					class="min-w-[16px] mr-2 my-auto"
				/>
				<div>Torna alla home</div>
			</NuxtLink>
		</div>

		<div>
			<div class="font-bold text-3xl leading-none">{{ article.title }}</div>
			<div class="text-slate-400 text-sm">{{ article.category_name }}</div>

			<hr class="my-5" />

			<NuxtImg :src="`${article.image_url}`" class="m-auto mb-5 rounded-sm" />

			<div
				v-for="(node, index) in parsedNodes"
				:is="node.tag"
				:key="index"
				v-bind="node.attributes"
				v-html="node.content"
			></div>
		</div>

		<hr class="my-5" />

		<div class="flex flex-col lg:flex-row justify-start gap-5">
			<div v-for="article in articles" class="w-full lg:w-[30%]">
				<Card class="h-[400px] flex flex-col justify-between">
					<CardHeader class="gap-0">
						<CardTitle>{{ article.title }}</CardTitle>
						<div class="text-slate-400 text-sm">
							{{ article.category_name }}
						</div>
					</CardHeader>
					<CardContent>
						<NuxtImg
							:src="`${article.image_url}`"
							class="m-auto w-3/4 sm:w-2/3 md:w-1/2 lg:w-full max-w-80"
						/>
					</CardContent>
					<CardFooter class="justify-end items-end px-6 pb-2">
						<NuxtLink :to="`/article/${article.slug}`">
							Scopri di più
							<Icon
								name="line-md:arrow-right"
								size="16"
								class="min-w-[16px] ml-2 my-auto"
							/> </NuxtLink
					></CardFooter>
				</Card>
			</div>
		</div>

		<!-- Ancora -->
		<div
			v-show="isVisible"
			id="anchor"
			class="fixed right-0 bottom-0 pb-10 pr-10 pointer-events-auto"
		>
			<NuxtLink
				class="w-10 h-10 bg-[#D3D3D3] rounded-lg flex items-center justify-center cursor-pointer"
				@click="scrollToAnchor()"
			>
				<Icon name="line-md:arrow-up" size="16" class="text-white" />
			</NuxtLink>
		</div>
	</MainLayout>
</template>

<style>
	div[is="h2"] {
		font-size: 20px;
		font-weight: bold;
		margin-top: 1rem;
	}

	div[is="p"] a {
		text-decoration: underline;
	}

	div[is="p"] img {
		max-width: 100%;
		height: auto;
		display: block;
		margin: 1rem auto;
	}

	#anchor {
		transition: opacity 0.3s ease;
	}
</style>
