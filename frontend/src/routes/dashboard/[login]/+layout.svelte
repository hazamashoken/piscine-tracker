<script lang="ts">
	let { children } = $props();
</script>

<main class="h-screen w-screen p-2">
  <div class="grid grid-cols-2 grid-rows-2 h-full gap-2">
    {@render children()}
  </div>
</main>

