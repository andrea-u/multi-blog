import { buildRequestInit } from "@datocms/cda-client";

export function useQuery(query, options) {
	const config = useRuntimeConfig();
	const api = config.public.datocmsApiToken;

	const optionsWithToken = {
		...options,
		token: api,
	};

	return useFetch("https://graphql.datocms.com/", {
		...buildRequestInit(query, optionsWithToken),
		key: api,
		transform: ({ data, errors }) => {
			if (errors)
				throw new Error(
					`Something went wrong while executing the query: ${JSON.stringify(
						errors
					)}`
				);

			return data;
		},
	});
}
