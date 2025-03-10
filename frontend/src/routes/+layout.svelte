<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main data-theme="light" class="font-satoshi">
	{@render children()}
</main>
