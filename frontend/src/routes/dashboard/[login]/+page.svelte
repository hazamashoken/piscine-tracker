<script>
	import { page } from "$app/state";
	let { login } = page.params;
	import UserInfo from "$lib/components/UserInfo.svelte";
</script>

<UserInfo login={login} />
<div>Placeholder</div>
<div>Evaluation Feedbacks</div>
<div>Stockmarket</div>