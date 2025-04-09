<script lang="ts">
	import Evaluation from "./Evaluation.svelte";
	import { onMount } from "svelte";
	import { capitalizeEach } from "$lib/functions";

	let { scale_team_corrector, scale_team_corrected } = $props();

	let corrector: Record<string, number> = $state({
		ok: 0,
		"outstanding project": 0,
		"empty work": 0,
		"can’t support / explain code": 0,
		"norme": 0
	});
	let corrected: Record<string, number> = {
		ok: 0,
		"outstanding project": 0,
		"empty work": 0,
		"can’t support / explain code": 0,
		"norme": 0
	};

	let tab = $state("corrector");

	function switchTab(newTab: string) {
		tab = newTab;
	}

	onMount(() => {
		scale_team_corrector.forEach((evaluation: any) => {
			corrector[evaluation.flag.toLowerCase()]++;
		});

		scale_team_corrected.forEach((evaluation: any) => {
			corrected[evaluation.flag.toLowerCase()]++;
		});
	});
</script>

<div
	class="bg-primary border-secondary flex h-full w-full flex-col rounded-lg border-2 p-3 md:p-4"
>
	<h1 class="text-xl md:text-2xl font-bold">Evaluation Logs</h1>
	<div class="flex flex-col md:flex-row justify-between gap-2 text-gray-500 mb-2">
		<div class="flex flex-row gap-2 text-gray-500">
			<p>Evaluator: <span class="text-secondary font-bold">{scale_team_corrector.length}</span></p>
			<p>Evaluated: <span class="text-secondary font-bold">{scale_team_corrected.length}</span></p>
		</div>
		<div class="grid grid-cols-2 gap-1 text-[10px] md:text-[9px]">
			{#if tab == "corrector"}
			{#each Object.keys(corrector) as flag}
				{#if flag != "ok" && flag != "outstanding project"}
					{#if flag == "can’t support / explain code"}
						<div class="badge badge-error text-primary font-bold">Can't Explain: {corrector[flag]}</div>
					{:else}
						<div class="badge badge-error text-primary font-bold">{capitalizeEach(flag, " ")}: {corrector[flag]}</div>
					{/if}
				{:else}
					<div class="badge badge-accent font-bold">{capitalizeEach(flag, " ")}: {corrector[flag]}</div>
					{/if}
				{/each}
			{:else}
			{#each Object.keys(corrected) as flag}
			{#if flag != "ok" && flag != "outstanding project"}
				{#if flag == "can’t support / explain code"}
					<div class="badge badge-error text-primary font-bold">Can't Explain: {corrected[flag]}</div>
				{:else}
					<div class="badge badge-error text-primary font-bold">{capitalizeEach(flag, " ")}: {corrected[flag]}</div>
				{/if}
				{:else}
					<div class="badge badge-accent font-bold">{capitalizeEach(flag, " ")}: {corrected[flag]}</div>
				{/if}
			{/each}
			{/if}
		</div>
	</div>
	<div class="tabs tabs-lift flex-grow p-1 flex flex-col">
		<div class="flex">
			<input type="radio" name="feedback" class="tab" aria-label="Evaluator" checked="checked" onclick={() => switchTab("corrector")} />
			<input type="radio" name="feedback" class="tab" aria-label="Evaluated" onclick={() => switchTab("corrected")} />
		</div>
		<div class="tab-content bg-base-100 border-base-300 flex-grow overflow-y-auto p-2 md:p-4">
			{#if tab == "corrector"}
				{#if scale_team_corrector.length == 0}
					<p>No Data</p>
				{:else}
					{#each scale_team_corrector as evaluation}
						<Evaluation {evaluation} />
					{/each}
				{/if}
			{:else}
				{#if scale_team_corrected.length == 0}
					<p>No Data</p>
				{:else}
					{#each scale_team_corrected as evaluation}
						<Evaluation {evaluation} />
					{/each}
				{/if}
			{/if}
		</div>
	</div>
</div>
