<script lang="ts">
	let { children } = $props();
	import { onMount } from 'svelte';
	import { base } from '$app/paths';
	import { goto } from '$app/navigation';

	let search = $state('');

	function focusSearch() {
		const search = document.querySelector('input') as HTMLInputElement;
		search.focus();
	}

	function handleSearch(event: Event | null = null) {
		const inputElement = document.querySelector('input') as HTMLInputElement;
		search = inputElement?.value?.toLowerCase() || '';
		console.log(search);
		if (search.length == 0) return;
		goto(`${base}/dashboard/${search}`);
	}

	onMount(() => {
		document.addEventListener('keydown', (event) => {
			const activeElement = document.activeElement as HTMLElement;
			if (activeElement.tagName != 'INPUT') {
				if (event.key === 'Backspace') {
					event.preventDefault();
					focusSearch();
				}
			}
			if (event.key === 'Enter') {
				console.log('Enter');
				event.preventDefault();
				handleSearch();
			}
			if (event.metaKey && event.key === 'k') {
				event.preventDefault();
				focusSearch();
			}
		});
	});
</script>

<main class="flex h-screen w-screen flex-col overflow-hidden p-2 pb-4">
	<div class="mx-auto mb-2 w-full max-w-md">
		<label class="input focus-within:input-accent w-full rounded-lg focus-within:outline-none">
			<svg class="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
				><g
					stroke-linejoin="round"
					stroke-linecap="round"
					stroke-width="2.5"
					fill="none"
					stroke="currentColor"
					><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></g
				></svg
			>
			<input type="search" class="grow" placeholder="Search" bind:value={search} />
			<kbd class="kbd kbd-sm">⌘</kbd>
			<kbd class="kbd kbd-sm">K</kbd>
		</label>
	</div>
	<div class="grid h-full w-full grid-cols-1 gap-2 overflow-hidden sm:grid-cols-2 sm:grid-rows-2">
		{@render children()}
	</div>
</main>
