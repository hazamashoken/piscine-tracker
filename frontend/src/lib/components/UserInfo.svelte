<script>
	let { user, vox } = $props();
</script>

<div class="bg-primary border-secondary flex h-full flex-col gap-4 rounded-lg border-2 p-10">
	<div class="avatar">
		<div class="ring-primary ring-offset-accent w-36 rounded-full ring ring-offset-4">
			<img src={user.image_url} alt={user.login} />
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-bold">{user.login}</h1>
		<h1 class="text-xl font-semibold">{user.first_name} {user.last_name}</h1>
		<p class="text-md text-gray-500">{user.email}</p>
		<p class="text-md font-semibold">
			{user.pool_month[0].toUpperCase() + user.pool_month.slice(1)}
			{user.pool_year}
		</p>
		<p class="text-md text-gray-500">
			Level: <span class="text-secondary font-bold">{user.level}</span>
		</p>
		<progress class="progress progress-accent w-full" value={user.level} max={Math.ceil(user.level)}
		></progress>
		<p class="text-md text-gray-500">
			Voxotron Votes: <span class="text-secondary font-bold">{user.vox}</span>
		</p>
		<!-- <p class="text-md text-gray-500">
			Voxotron Rank: <span class="text-secondary font-bold">{user.vox_rank}</span>
		</p> -->
	</div>
</div>
