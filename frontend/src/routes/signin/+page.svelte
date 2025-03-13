<script lang="ts">
	import logo from '$lib/assets/42_Logo.svg';
</script>

<svelte:head>
	<title>Sign In</title>
</svelte:head>

<img src={logo} alt="42" class="w-44" />
<h1 class="text-4xl font-bold">Piscine Tracker</h1>
<form method="POST" action="?/login" class="hero-content text-secondary flex flex-col">
	<div>
		<input
			class="input validator"
			name="email"
			type="email"
			required
			placeholder="email"
		/>
		<div class="validator-hint">Enter valid email address</div>
		<input
			type="password"
			name="password"
			class="input validator"
			required
			placeholder="Password"
			minlength="8"
		/>
	</div>
	<button class="btn btn-secondary hover:btn-accent hover:text-primary font-bold w-full">Log in</button>
</form>
