import { pb } from '$lib/pocketbase';
export async function load() {
	let logins = []
	const data = await pb.collection("pisciner").getFullList({
		sort: "login",
		filter: "is_pisciner=true"
	});
	logins = data.map((pisciner) => pisciner.login);
	return {
		logins
	};
}