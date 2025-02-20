<script>
	import Evaluation from './Evaluation.svelte';

	let { scale_team_corrector, scale_team_corrected } = $props();
</script>

<div class="bg-primary border-secondary flex flex-col justify-center rounded-lg border-2 p-4">
	<h1 class="text-2xl font-bold">Evaluation Logs</h1>
	<div class="flex flex-row gap-2 text-gray-500">
		<p>Evaluator: <span class="font-bold text-secondary">{scale_team_corrector.length}</span></p>
		<p>Evaluated: <span class="font-bold text-secondary">{scale_team_corrected.length}</span></p>
	</div>
	<div class="tabs tabs-lift h-80 p-2">
		<input type="radio" name="feedback" class="tab" aria-label="Corrector" checked="checked" />
		<div class="tab-content bg-base-100 border-base-300 overflow-y-auto p-6">
			{#if scale_team_corrector.length == 0}
				<p>No Data</p>
			{:else}
				{#each scale_team_corrector as evaluation}
					<Evaluation {evaluation} />
				{/each}
			{/if}
		</div>
		<input type="radio" name="feedback" class="tab" aria-label="Corrected" />
		<div class="tab-content bg-base-100 border-base-300 overflow-y-auto p-6">
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
