import { pb } from '$lib/pocketbase';

export async function GET({ params }) {
  const { login } = params;
  const user = await pb.collection(import.meta.env.VITE_PB_USERS_COLLECTION).getList(1, 1, {
    filter: `login = "${login}"`
  });
  return new Response(JSON.stringify(user.items[0]));
}