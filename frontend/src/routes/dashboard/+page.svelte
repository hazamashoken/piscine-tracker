<script>
	import { goto } from "$app/navigation";
	let { data } = $props();
</script>

<div class="grid grid-cols-2 grid-rows-2 h-full gap-2">
	{#each data.logins as login}
		<a class="btn btn-primary hover:bg-accent" href={`/dashboard/${login}`}>{login}</a>
	{/each}
</div>