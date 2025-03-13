import { base } from '$app/paths';
import { pb } from "$lib/pocketbase";
import { redirect } from '@sveltejs/kit';

export const actions = {
    default: async ({ cookies }) => {
        pb.authStore.clear();
        cookies.set('session', '', {
            path: '/',
            expires: new Date(0)
        });

        throw redirect(303, `${base}`);
    }
};