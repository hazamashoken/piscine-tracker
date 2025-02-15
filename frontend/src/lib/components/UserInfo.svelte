<script>
	let { user } = $props();

	let project_summary = $state({
		total_projects: 0,
		total_validated: 0,
		total_occurrences: 0,
		total_marks: 0,
		average_mark: 0
	});
	$effect(() => {
		if (user) {
			const projects = Object.values(user.projects);

			let data = {
				total_projects: 0,
				total_validated: 0,
				total_occurrences: 0,
				total_marks: 0,
				average_mark: 0
			};

			for (let project of projects) {
				data.total_projects++;
				if (project.validated) {
					data.total_validated++;
				}
				data.total_occurrences += project.occurrence;
				data.total_marks += project.final_mark;
			}

			data.average_mark = Math.round(data.total_marks / data.total_validated) || 0;
			project_summary = data;
		}
	});
</script>

{#if !user}
	<div class="flex w-52 flex-col gap-4">
		<div class="flex items-center gap-4">
			<div class="skeleton h-16 w-16 shrink-0 rounded-full"></div>
			<div class="flex flex-col gap-4">
				<div class="skeleton h-4 w-20"></div>
				<div class="skeleton h-4 w-28"></div>
			</div>
		</div>
		<div class="skeleton h-32 w-full"></div>
	</div>
{:else}
	<div class="bg-primary border-secondary flex flex-col gap-4 rounded-lg border-2 p-10 shadow-xl">
		<div class="avatar">
			<div class="ring-primary ring-offset-accent w-24 rounded-full ring ring-offset-2">
				<img src={user.image_url} alt={user.login} />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold">{user.login}</h1>
			<p class="text-sm text-gray-500">
				Level: <span class="text-secondary font-bold">{user.level}</span>
			</p>
			<progress class="progress progress-accent w-full" value={user.level} max={Math.ceil(user.level)}
			></progress>
			<p class="text-sm text-gray-500">
				Evaluation Points: <span class="text-secondary font-bold">{user.correction_point}</span>
			</p>
			<p class="text-sm text-gray-500">
				Projects: <span class="text-secondary font-bold">{project_summary.total_projects}</span>
			</p>
			<p class="text-sm text-gray-500">
				Validated: <span class="text-secondary font-bold">{project_summary.total_validated}</span>
			</p>
			<p class="text-sm text-gray-500">
				occurrences: <span class="text-secondary font-bold"
					>{project_summary.total_occurrences}</span
				>
			</p>
			<p class="text-sm text-gray-500">
				Average Mark: <span class="text-secondary font-bold">{project_summary.average_mark}</span>
			</p>
		</div>
	</div>
{/if}
