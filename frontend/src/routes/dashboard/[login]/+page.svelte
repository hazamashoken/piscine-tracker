<script lang="ts">
	import UserInfo from "$lib/components/UserInfo.svelte";
	import EvaluationLogs from "$lib/components/EvaluationLogs.svelte";
	export let data;
</script>

<UserInfo user={data.pisciner} />
<div>Placeholder</div>
<EvaluationLogs scale_team_corrector={data.scale_team_corrector} scale_team_corrected={data.scale_team_corrected} />
<div>Stockmarket</div>