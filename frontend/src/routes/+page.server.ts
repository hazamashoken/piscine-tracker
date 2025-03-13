import { base } from '$app/paths';
import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
export async function load({ cookies }) {
	const session = cookies.get("session");
	if (session) {
		let logins = []
		const data = await pb.collection("pisciner").getFullList({
			sort: "login",
			filter: "is_pisciner=true"
		});
		logins = data.map((pisciner) => pisciner.login);
		return {
			logins
		};
	} else {
		redirect(301, `/piscine-tracker/signin`)
	}
}