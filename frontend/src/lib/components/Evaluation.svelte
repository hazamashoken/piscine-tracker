<script>
	import { capitalizeEach } from "$lib/functions";

	let { evaluation } = $props();
</script>

<div
	class="border-base-300 hover:border-accent mt-2 mb-2 flex flex-col gap-2 rounded-lg border-2 border-b-2 p-4 text-sm transition-all duration-300 hover:scale-101 hover:shadow-xl"
>
	<div class="flex flex-row items-center justify-between gap-2">
		<div>
			<h2>
				<a
					href="/dashboard/{evaluation.corrector}"
					class="link link-hover text-accent font-bold hover:opacity-50">{evaluation.corrector}</a
				>
				evaluated
				<a
					href="/dashboard/{evaluation.corrected}"
					class="link link-hover text-accent font-bold hover:opacity-50">{evaluation.corrected}</a
				>
			</h2>
		</div>
		<div class="flex flex-row gap-2">
			{#if evaluation.flag.toLowerCase() == 'ok' || evaluation.flag.toLowerCase() == 'outstanding project'}
				<div class="badge badge-success text-primary text-xs font-bold">{evaluation.final_mark}%</div>
				<div>
					<div class="badge badge-success text-primary text-xs font-bold">{capitalizeEach(evaluation.flag, ' ')}</div>
				</div>
			{:else}
				<div class="badge badge-error text-primary text-xs font-bold">{evaluation.final_mark}%</div>
				<div class="badge badge-error text-primary text-xs font-bold">
					{capitalizeEach(evaluation.flag, ' ')}
				</div>
			{/if}
		</div>
	</div>
	<div>
		<p class="text-xs">Comment</p>
		<p class="font-semibold">{evaluation.comment}</p>
	</div>
	<div>
		<p class="text-xs">Feedback</p>
		<p class="font-semibold">{evaluation.feedback}</p>
	</div>
</div>
