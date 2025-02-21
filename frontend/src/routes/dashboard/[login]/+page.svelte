<script lang="ts">
	import UserInfo from "$lib/components/UserInfo.svelte";
	import ProjectPanel from "$lib/components/ProjectPanel.svelte";
	import EvaluationLogs from "$lib/components/EvaluationLogs.svelte";
	let { data } = $props();
</script>

<div>
<UserInfo user={data.pisciner} />
</div>
<div>
<ProjectPanel projects={data.team} />
</div>
<div>
<EvaluationLogs scale_team_corrector={data.scale_team_corrector} scale_team_corrected={data.scale_team_corrected} />
</div>
<div>Stockmarket</div>