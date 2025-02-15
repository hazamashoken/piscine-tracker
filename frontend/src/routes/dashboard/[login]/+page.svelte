<script lang="ts">
	import { page } from "$app/state";
	import { onMount } from "svelte";
	let { login } = page.params;
	import UserInfo from "$lib/components/UserInfo.svelte";

	async function loadUser() {
		const response = await fetch(`/api/users/${login}`);
		const data = await response.json();
		return data;
	}

	let user: any = $state(null);

	onMount(async () => {
		setTimeout(async () => {
			user = await loadUser();
		}, 1000);
	});
</script>

<UserInfo user={user} />
<div>Placeholder</div>
<div>Evaluation Feedbacks</div>
<div>Stockmarket</div>