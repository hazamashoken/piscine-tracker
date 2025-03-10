<script lang="ts">
	let { projects } = $props();

	const exam: Record<number, string> = {
		1301: 'Piscine Exam 00',
		1302: 'Piscine Exam 01',
		1303: 'Piscine Exam 02',
		1304: 'Piscine Final Exam'
	};
	let sortedProjects = projects.sort((a, b) => b.final_mark - a.final_mark);
	let uniqueProjects: any[] = [];
	sortedProjects.reduce(function (a: any, b: any, c: any) {
		if (a.indexOf(b.project_id) === -1) {
			a.push(b.project_id);
			uniqueProjects.push(b);
		}
		return a;
	}, []);
	uniqueProjects = uniqueProjects.sort((a, b) => a.project_id - b.project_id)
</script>

<div
	class="bg-primary border-secondary flex h-full flex-col justify-center rounded-lg border-2 p-4"
>
	<h1 class="text-2xl font-bold">Projects</h1>
	<div class="fade-tb grid h-96 w-full grid-cols-4 gap-4 overflow-y-auto p-6">
		{#each uniqueProjects as project}
			<div
				class="card {project.final_mark >= 50
					? 'bg-success/20 border-success'
					: 'bg-error/20 border-error'} hover:border-accent hover:bg-accent/20 rounded-lg border-2 p-4 transition-all duration-300 hover:scale-101 hover:shadow-xl h-26"
			>
				<div class="card-body p-0 justify-between items-center lg:items-left">
					<h2 class="card-title text-xs font-bold lg:text-lg">
						{project.project_name.split('/').slice(-1)[0]
							? project.project_name.split('/').slice(-1)[0]
							: exam[project.project_id]}
					</h2>
					<div class="badge badge-accent scale-70 text-xs font-bold lg:scale-100">
						{project.final_mark ? project.final_mark : '0'}%
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>
