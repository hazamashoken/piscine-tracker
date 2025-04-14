<script lang="ts">
	import UserInfo from '$lib/components/UserInfo.svelte';
	import ProjectPanel from '$lib/components/ProjectPanel.svelte';
	import EvaluationLogs from '$lib/components/EvaluationLogs.svelte';
	import RushPanel from '$lib/components/RushPanel.svelte';
	import { base } from '$app/paths';

	let { data } = $props();
</script>

<!-- <div
	class="absolute top-0 left-0 flex h-screen w-[10%] items-center pl-4"
	onclick={() => window.location.href = `${base}/dashboard/${data.previous}`}
></div>
<div
	class="absolute top-0 right-0 flex h-screen w-[10%] items-center justify-end pr-4"
	onclick={() => window.location.href = `${base}/dashboard/${data.next}`}
></div> -->
<div>
	<UserInfo user={data.pisciner} vox={data.vox} />
</div>
<div>
	<EvaluationLogs
		scale_team_corrector={data.scale_team_corrector}
		scale_team_corrected={data.scale_team_corrected}
	/>
</div>
<div>
	<ProjectPanel projects={data.team} />
</div>
<div>
	<RushPanel rushes={data.rush} />
</div>
