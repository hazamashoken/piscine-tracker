<script lang="ts">
	let { projects } = $props();

	const exam: Record<number, string> = {
		1301: 'Piscine Exam 00',
		1302: 'Piscine Exam 01',
		1303: 'Piscine Exam 02',
		1304: 'Piscine Final Exam'
	};
</script>

<div
	class="bg-primary border-secondary flex h-full flex-col justify-center rounded-lg border-2 p-4"
>
	<h1 class="text-2xl font-bold">Projects</h1>
	<div class="fade-tb grid h-96 grid-cols-2 gap-2 overflow-y-auto p-6">
		{#each projects as project}
			<div
				class="card {project.final_mark >= 50
					? 'bg-success/20 border-success'
					: 'bg-error/20 border-error'} hover:border-accent hover:bg-accent/20 rounded-lg border-2 p-4 transition-all duration-300 hover:scale-101 hover:shadow-xl"
			>
				<div class="card-body">
					<h2 class="card-title font-bold">
						{project.project_name.split('/').slice(-1)[0]
							? project.project_name.split('/').slice(-1)[0]
							: exam[project.project_id]}
					</h2>
					<div class="badge badge-accent text-xs font-bold">
						{project.final_mark ? project.final_mark : '0'}%
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
