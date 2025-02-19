<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let { data } = $props();
	let search = $state('');

	function centerElement(event: Event) {
		const button = event.currentTarget as HTMLElement;
		const container = button.parentElement as HTMLElement;
		const buttonRect = button.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		const scrollLeft =
			container.scrollLeft +
			buttonRect.left -
			containerRect.left -
			containerRect.width / 2 +
			buttonRect.width / 2;

		container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
	}

	function focusSearch() {
		const search = document.querySelector('input') as HTMLInputElement;
		search.focus();
	}

	function handleSearch(event: Event) {
		const target = event.currentTarget as HTMLInputElement;
		search = target.value.toLowerCase();
		if (search.length == 0) return;
		const selector = document.querySelector(`#${search}`) as HTMLElement | null;
		if (selector) {
			selector.focus();
			const buttonElement = selector.closest('button');
			if (buttonElement) {
				const centerEvent = new Event('focus');
				Object.defineProperty(centerEvent, 'currentTarget', { value: buttonElement });
				centerElement(centerEvent);
				buttonElement.focus();
			}
		}
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
			if (event.metaKey && event.key === 'k') {
				event.preventDefault();
				focusSearch();
			}
		});
	});
</script>

<div class="flex min-h-screen flex-col items-center justify-center gap-2">
<h1 class="text-center text-2xl font-bold">Piscine Tracker</h1>
	<label class="input focus-within:input-accent rounded-lg focus-within:outline-none">
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
		<input
			type="search"
			class="grow"
			placeholder="Search"
			bind:value={search}
			oninput={handleSearch}
		/>
		<kbd class="kbd kbd-sm">⌘</kbd>
		<kbd class="kbd kbd-sm">K</kbd>
	</label>
	<div class="fade-lr item-center mx-auto flex h-56 w-5/6 flex-row gap-6 overflow-x-auto p-20">
		{#each data.logins as login}
			<button
				class="select-accent hover:border-accent focus:border-accent group relative h-14 w-14 origin-center rounded-full border-6 transition-all duration-150 hover:h-18 hover:scale-150 focus:h-18 focus:scale-150 focus:outline-none"
				onclick={() => goto(`/dashboard/${login}`)}
				onfocus={centerElement}
			>
				<span class="absolute inset-[-20px] rounded-full"></span>
				<span
					id={login}
					class="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
				>
					{login}
				</span>
			</button>
		{/each}
	</div>
	<button class="btn btn-primary hover:bg-accent hover:text-accent-content rounded-lg" onclick={() => goto('/dashboard')}>Dashboard</button>
</div>
