import { base } from '$app/paths';
import { pb } from '$lib/pocketbase';
import { redirect } from '@sveltejs/kit';
export async function load({ cookies }) {
	const session = cookies.get("piscine-tracker.Session");
	if (session) {
		let logins = []
		const data = await pb.collection("pisciner").getFullList({
			sort: "login",
			filter: "is_pisciner=true && pool_month = 'march' && pool_year = '2025'"
		});
		logins = data.map((pisciner) => pisciner.login);
		return {
			logins
		};
	} else {
		redirect(301, `${base}/signin`)
	}
}