<script>
	let { user } = $props();
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
			<div class="ring-primary ring-offset-accent w-24 rounded-full ring ring-offset-4">
				<img src={user.image.link} alt={user.login} />
			</div>
		</div>
		<div class="flex flex-col gap-2">
			<h1 class="text-2xl font-bold">{user.login}</h1>
			<p class="text-sm text-gray-500">{user.email}</p>
			<p class="text-sm font-semibold">
				{user.pool_month[0].toUpperCase() + user.pool_month.slice(1)} {user.pool_year}
			</p>
		</div>
	</div>
{/if}