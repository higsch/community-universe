<script>
	import Modal from '$lib/Modal.svelte';
	import BadgeUniverse from '$lib/BadgeUniverse.svelte';
	import BadgeConfigurator from '$lib/BadgeConfigurator.svelte';

	export let data;

	$: ({ badges = [] } = data);

	let modalOpen = false;
</script>

<main>
	<BadgeUniverse data={badges} />
	<button on:click={() => (modalOpen = true)}>Create your own star</button>
	<Modal bind:isOpen={modalOpen}>
		<span slot="header">Create your own star</span>
		<BadgeConfigurator
			data={[5, 5, 5, 5, 5, 5, 5, 5, 5, 5]}
			on:sent={() => (modalOpen = false)}
		/>
	</Modal>
</main>

<style>
</style>
