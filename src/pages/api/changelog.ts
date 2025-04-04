const API_URL = "https://graphql.datocms.com";
const API_TOKEN = process.env.DATOCMS_API_TOKEN;

async function fetchAPI(query: string) {
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				...API_TOKEN ? { Authorization: API_TOKEN } : {}
			},
			body: JSON.stringify({
				query,
			}),
		});

		const json = await res.json();
		return json;
	} catch (error) {
		console.log(error);
	}
}

export async function getChangelog() {
	const data = await fetchAPI(`
    {
        allChangelogs {
            id
            version
            title
            items {
                value
            }
            content {
                value
            }
            date
        }
    }
    `);
	return data;
}
