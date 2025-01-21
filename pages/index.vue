<script setup lang="ts">
	import { ref } from "vue";
	const { $articleStore } = useNuxtApp();

	import MainLayout from "~/layouts/MainLayout.vue";

	import {
		Card,
		CardContent,
		CardDescription,
		CardFooter,
		CardHeader,
		CardTitle,
	} from "@/components/ui/card";

	const articles = ref([]);

	onBeforeMount(async () => {
		await $articleStore.getAllArticles();

		articles.value = $articleStore.articles;
	});

	onMounted(() => {
		getArticles();
	});

	const getArticles = () => {
		articles.value = $articleStore.articles;
	};
</script>

<template>
	<MainLayout>
		<div class="flex flex-col lg:flex-row justify-between gap-2">
			<div v-for="article in articles" class="w-full lg:w-[30%]">
				<Card class="h-[400px] flex flex-col justify-between shadow-[#D3D3D3]">
					<CardHeader class="gap-0">
						<CardTitle>{{ article.title }}</CardTitle>
						<div class="text-slate-400 text-sm">
							{{ article.category_name }}
						</div>
					</CardHeader>
					<CardContent>
						<NuxtImg
							:src="`${article.image_url}`"
							class="m-auto w-3/4 sm:w-1/2 md:w-1/2 lg:w-full"
						/>
					</CardContent>
					<CardFooter class="justify-end items-end px-6 pb-2">
						<NuxtLink
							:to="`/article/${article.slug}`"
							class="flex hover:underline"
						>
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
	</MainLayout>
</template>
