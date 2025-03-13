<script lang="ts">
	let { children } = $props();
</script>

<main data-theme="light" class="font-satoshi hero place-items-center">
	<div class="hero-content flex flex-col">
		{@render children()}
	</div>
</main>
