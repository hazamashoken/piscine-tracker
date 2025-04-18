import { pb } from "$lib/pocketbase";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';
import { base } from '$app/paths';

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        cookies.get("piscine-tracker.Session");
    } catch {
        redirect(301, `${base}/signin`)
    }
};

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();
        const email = data.get('email');
        const password = data.get('password');

        try {
            const authData = await pb.collection('users').authWithPassword(
                email,
                password,
            );
        } catch (error) {
            redirect(301, `${base}/signin`);
        }
        cookies.set('piscine-tracker.Session', pb.authStore.token, { path: `/` });

        redirect(301, `${base}/`);
    },
} satisfies Actions;