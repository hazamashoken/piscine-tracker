<script lang="ts">
	import UserInfo from "$lib/components/UserInfo.svelte";
	import ProjectPanel from "$lib/components/ProjectPanel.svelte";
	import EvaluationLogs from "$lib/components/EvaluationLogs.svelte";
	export let data;
</script>

<UserInfo user={data.pisciner} />
<ProjectPanel projects={data.team} />
<EvaluationLogs scale_team_corrector={data.scale_team_corrector} scale_team_corrected={data.scale_team_corrected} />
<div>Stockmarket</div>