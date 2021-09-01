// tslint:disable:no-console
/// <reference lib="webworker" />

importScripts('https://unpkg.com/dexie@3.0.1/dist/dexie.js');

const baseUrl = window.location.origin;

// @ts-ignore
const database = new Dexie('seo');
database.version(1).stores({
	articles: 'id, text',
});

function createGuid(): string {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = Math.random() * 16 | 0;
		const v = c === 'x' ? r : ((r & 0x3) | 0x8);
		return v.toString(16);
	});
}

function delay(ms = 2000) {
	return new Promise((resolve) => setTimeout(() => {
		return resolve(void 0)
	}, ms));
}

// @ts-ignore
window.addEventListener('fetch', (event: FetchEvent) => {
	if (event.request.url === `${baseUrl}/article`) {
		const guid = createGuid();
		event.respondWith(
			event.request.json()
				.then(({ article }: { article: string}) => {
					return database.articles.put({
						id: guid,
						text: article
					})
				})
				.then(() => database.articles.get(guid))
				.then(addResponse)
		)
	}
});

export async function addResponse(data: any, status = 200) {
	await delay(status);
	return new Response(
		JSON.stringify(data),
		{
			headers: {
				'Content-Type': 'application/json'
			},
			status
		}
	)
}