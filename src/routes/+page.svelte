<script>
	import { names, careerImages } from '$utils/config';

	import Background from '$lib/Background.svelte';
	import Modal from '$lib/Modal.svelte';
	import BadgeUniverse from '$lib/BadgeUniverse.svelte';
	import BadgeConfigurator from '$lib/BadgeConfigurator.svelte';
	import PersonalityFlow from '$lib/PersonalityFlow.svelte';

	export let data;

	$: ({ badges = [], personalities = [] } = data);

	let width, height;
	let modalOpen = false;
	let universeHeight;
</script>

<main
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<Background width={width} height={height} />
	
	<button
		on:click={() => (modalOpen = true)}
		style:top="{universeHeight / 7}px">Add your star to the universe</button
	>

	<BadgeUniverse
		data={badges}
		bind:height={universeHeight}
	/>

	<div class="personality-flows">
		{#each names as name, i}
		<PersonalityFlow
			data={personalities.filter((d) => d.name === name)}
			careerImages={careerImages[name]}
			universeHeight={universeHeight}
			yearLabels={i === 0}
		/>
		{/each}
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
		width: 100%;
	}

	button {
		position: absolute;
		left: 50%;
		width: 50%;
		min-width: 300px;
		max-width: 400px;
		z-index: 300;
		transform: translateX(-50%);
	}

	.personality-flows {
		position: relative;
		z-index: 1;
		display: flex;
		width: 100%;
	}
</style>
