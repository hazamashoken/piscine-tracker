<script lang="ts">
	let { children } = $props();
  let search = $state('');
  let handleSearch = $state(() => {
    console.log(search);
  });
</script>

<main class="flex h-screen w-screen flex-col overflow-hidden p-2 pb-4">
	<div class="mb-2 w-full max-w-md mx-auto">
    <label class="input focus-within:input-accent rounded-lg focus-within:outline-none w-full">
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
	</div>
	<div class="grid h-full w-full grid-cols-1 gap-2 overflow-hidden sm:grid-cols-2 sm:grid-rows-2">
		{@render children()}
  </div>
</main>

