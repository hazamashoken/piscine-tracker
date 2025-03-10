import { pb } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	let data = {
		pisciner: {},
		team: {},
		scale_team_corrector: {},
		scale_team_corrected: {},
		rush: [],
		previous: "",
		next: ""
	}
	const { login } = params;
	const pisciner = await pb.collection("pisciner").getList(1, 1, {
		filter: `login = "${login}"`
	});
	if (pisciner.items.length === 0) {
		throw error(404, 'Pisciner not found');
	};
	data.pisciner = pisciner.items[0];
	const vox = await pb.collection("vox").getList(1, 1, {
		filter: `pisciner.login = "${login}"`
	});
	if (vox.items.length == 0)
		data.pisciner.vox = 0;
	else
		data.pisciner.vox = vox.items[0].vox1 + vox.items[0].vox2;
	const vox_rank = await pb.collection("vox").getFullList();
	vox_rank.sort((a, b) => (b.vox1 + b.vox2) - (a.vox1 + a.vox2));
	
	for (let i = 0; i < vox_rank.length; i++) {
		if (vox_rank[i].pisciner === pisciner.items[0].id) {
			data.pisciner.vox_rank = i + 1;
			break;
		}
	}
	const team = await pb.collection("team").getFullList({
		filter: `users.login = "${login}"`
	});
	data.team = team;
	const scale_team_corrector = await pb.collection("scale_team").getFullList({
		filter: `corrector.login = "${login}"`,
		sort: "-created"
	});
	data.scale_team_corrector = scale_team_corrector;
	for (const evaluation of scale_team_corrector) {
		const corrector = await pb.collection("pisciner").getOne(evaluation.corrector);
		evaluation.corrector = corrector.login;
		const corrected = await pb.collection("pisciner").getOne(evaluation.corrected);
		evaluation.corrected = corrected.login;
	}
	const scale_team_corrected = await pb.collection("scale_team").getFullList({
		filter: `corrected.login = "${login}"`
	});
	data.scale_team_corrected = scale_team_corrected;
	for (const evaluation of scale_team_corrected) {
		const corrector = await pb.collection("pisciner").getOne(evaluation.corrector);
		evaluation.corrector = corrector.login;
		const corrected = await pb.collection("pisciner").getOne(evaluation.corrected);
		evaluation.corrected = corrected.login;
	}
	const rush = await pb.collection("rush").getFullList({
		filter: `pisciner.login = "${login}"`
	});
	data.rush = rush;
	let logins = []
	const pisciners = await pb.collection("pisciner").getFullList({
		sort: "login"
	});
	logins = pisciners.map((pisciner) => pisciner.login);
	const currentIndex = logins.indexOf(data.pisciner.login);
	data.previous = currentIndex === 0 ? logins[logins.length - 1] : logins[currentIndex - 1];
	data.next = currentIndex === logins.length - 1 ? logins[0] : logins[currentIndex + 1];
	return data;
}