<script>
	import Evaluation from "./Evaluation.svelte";

	let { scale_team_corrector, scale_team_corrected } = $props();
	console.log(scale_team_corrector);
	console.log(scale_team_corrected);
</script>

<div class="bg-primary border-secondary flex flex-col rounded-lg border-2 p-4 justify-center">
	<h1 class="text-2xl font-bold">Evaluation Logs</h1>
	<div class="tabs tabs-lift p-2 h-96">
		<input type="radio" name="feedback" class="tab" aria-label="Corrector" checked="checked" />
		<div class="tab-content bg-base-100 border-base-300 p-6 overflow-y-auto">
			{#if scale_team_corrector.length == 0}
				<p>No Data</p>
			{:else}
				{#each scale_team_corrector as evaluation}
					<Evaluation {evaluation} />
				{/each}
			{/if}
		</div>
		<input type="radio" name="feedback" class="tab" aria-label="Corrected" />
		<div class="tab-content bg-base-100 border-base-300 p-6 overflow-y-auto">
			{#if scale_team_corrected.length == 0}
				<p>No Data</p>
			{:else}
				{#each scale_team_corrected as evaluation}
					<Evaluation {evaluation} />
				{/each}
			{/if}
		</div>
	</div>
</div>
