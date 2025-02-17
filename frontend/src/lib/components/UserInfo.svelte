<script>
	let { user } = $props();
</script>

<div class="bg-primary border-secondary flex flex-col gap-4 rounded-lg border-2 p-10 hover:shadow-xl hover:scale-105 transition-all duration-300">
	<div class="avatar">
		<div class="ring-primary ring-offset-accent w-24 rounded-full ring ring-offset-4">
			<img src={user.image_url} alt={user.login} />
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<h1 class="text-2xl font-bold">{user.login}</h1>
		<p class="text-sm text-gray-500">{user.email}</p>
		<p class="text-sm font-semibold">
			{user.pool_month[0].toUpperCase() + user.pool_month.slice(1)} {user.pool_year}
		</p>
		<p class="text-sm text-gray-500">
			Level: <span class="text-secondary font-bold">{user.level}</span>
		</p>
		<progress class="progress progress-accent w-full" value={user.level} max={Math.ceil(user.level)}
		></progress>
	</div>
</div>