<script lang="ts">
	let { children } = $props();
</script>

<main class="mx-auto min-h-screen flex items-center justify-center">
  <div class="grid grid-cols-2 gap-4">
    {@render children()}
  </div>
</main>

