<script>
	import Modal from '$lib/Modal.svelte';
	import BadgeUniverse from '$lib/BadgeUniverse.svelte';
	import BadgeConfigurator from '$lib/BadgeConfigurator.svelte';
	import PersonalityFlow from '$lib/PersonalityFlow.svelte';

	export let data;

	$: ({ badges = [], personalities = [] } = data);

	let modalOpen = false;
	let universeHeight;

	// $: console.log(personalities.filter((d) => d.name === 'Alenka'))
</script>

<main>
	<button on:click={() => (modalOpen = true)}>Create your own star</button>
	<BadgeUniverse
		data={badges}
		bind:height={universeHeight}
	/>

	<div class="personality-flows">
		<PersonalityFlow
			data={personalities.filter((d) => d.name === 'Alenka')}
			universeHeight={universeHeight}
			yearLabels
		/>
		<PersonalityFlow
			data={personalities.filter((d) => d.name === 'Matthias')}
			universeHeight={universeHeight}
		/>
	</div>
	<Modal bind:isOpen={modalOpen}>
		<span slot="header">Create your own star</span>
		<BadgeConfigurator
			data={[5, 5, 5, 5, 5, 5, 5, 5, 5, 5]}
			on:sent={() => (modalOpen = false)}
		/>
	</Modal>
</main>

<style>
	main {
		position: relative;
	}

	.personality-flows {
		display: flex;
		width: 100%;
	}
</style>
