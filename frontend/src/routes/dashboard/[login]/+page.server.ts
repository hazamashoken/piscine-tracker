import { pb } from '$lib/pocketbase';
import { error } from '@sveltejs/kit';
export async function load({ params }) {
	const { login } = params;
	const user = await pb.collection(import.meta.env.VITE_PB_USERS_COLLECTION).getList(1, 1, {
		filter: `login = "${login}"`
	});
	if (user.items.length === 0) {
		throw error(404, 'Pisciner not found');
	}
	return user.items[0];
}