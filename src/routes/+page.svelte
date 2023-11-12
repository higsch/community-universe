<script>
	import BadgeUniverse from '$lib/BadgeUniverse.svelte';
	import BadgeConfigurator from '$lib/BadgeConfigurator.svelte';

	export let data;
</script>

<main>
	<BadgeUniverse data={data} />
	<BadgeConfigurator />
</main>

<style>
</style>
