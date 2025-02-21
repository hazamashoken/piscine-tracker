<script lang="ts">
	import UserInfo from "$lib/components/UserInfo.svelte";
	import ProjectPanel from "$lib/components/ProjectPanel.svelte";
	import EvaluationLogs from "$lib/components/EvaluationLogs.svelte";
	import { goto } from "$app/navigation";

	let { data } = $props();
</script>

<div class="absolute left-0 top-0 flex h-screen w-[10%] items-center pl-4" onclick={() => goto(`/dashboard/${data.previous}`)}>
</div>
<div class="absolute right-0 top-0 flex h-screen w-[10%] items-center justify-end pr-4" onclick={() => goto(`/dashboard/${data.next}`)}>
</div>
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