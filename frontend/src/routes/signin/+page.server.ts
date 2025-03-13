import { pb } from "$lib/pocketbase";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
    try {
        cookies.get("session");
    } catch {
        redirect(301, "/signin")
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
            redirect(301, "/signin");
        }
        cookies.set('session', pb.authStore.token, { path: '/' });

        redirect(301, "/");
    },
} satisfies Actions;