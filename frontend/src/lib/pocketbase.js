import PocketBase from 'pocketbase';

export const pb = new PocketBase(process.env.VITE_PB_URL);
pb.autoCancellation(false);