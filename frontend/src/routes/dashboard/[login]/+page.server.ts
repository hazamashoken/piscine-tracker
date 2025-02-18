import { pb } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
export async function load({ params }) {
	let data = {
		pisciner: {},
		team: {},
		scale_team_corrector: {},
		scale_team_corrected: {}
	}
	const { login } = params;
	const pisciner = await pb.collection("pisciner").getList(1, 1, {
		filter: `login = "${login}"`
	});
	if (pisciner.items.length === 0) {
		throw error(404, 'Pisciner not found');
	}
	data.pisciner = pisciner.items[0];
	const team = await pb.collection("team").getFullList({
		filter: `users.login = "${login}"`
	});
	data.team = team;
	const scale_team_corrector = await pb.collection("scale_team").getFullList({
		filter: `corrector.login = "${login}"`
	});
	data.scale_team_corrector = scale_team_corrector;
	const scale_team_corrected = await pb.collection("scale_team").getFullList({
		filter: `corrected.login = "${login}"`
	});
	data.scale_team_corrected = scale_team_corrected;
	return data;
}