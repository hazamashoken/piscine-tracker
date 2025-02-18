import { pb } from '$lib/pocketbase';
export async function load() {
	let logins = []
	const data = await pb.collection("pisciner").getFullList();
	logins = data.map((pisciner) => pisciner.login);
	return {
		logins
	};
}