<script>
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import { browser } from '$app/environment';
	import { names, careerImages, flowLabels } from '$utils/config';

	import Background from '$lib/Background.svelte';
	import Modal from '$lib/Modal.svelte';
	import BadgeUniverse from '$lib/BadgeUniverse.svelte';
	import BadgeConfigurator from '$lib/BadgeConfigurator.svelte';
	import PersonalityFlow from '$lib/PersonalityFlow.svelte';
	import Footer from '$lib/Footer.svelte';

	export let data;

	let uuid;

	onMount(() => {
		uuid = localStorage.getItem('serendipitytoviz-uuid');
		if (!uuid) {
			uuid = uuidv4();
			localStorage.setItem('serendipitytoviz-uuid', uuid);
		}
	});

	$: ({ badges = [], personalities = [] } = data);
	$: badgeAdded = badges.some((d) => d.user_id === uuid);

	let width, height;
	let modalOpen = false;
	let universeHeight;
</script>

<main
	bind:clientWidth={width}
	bind:clientHeight={height}
>
	<Background
		width={width}
		height={height}
	/>

	{#if browser && window.location.href === 'http://localhost:3000/'}
		<h2>SerendipityToViz.com</h2>
	{/if}

	{#if !badgeAdded}
		<button
			on:click={() => (modalOpen = true)}
			style:top="{universeHeight / 7}px">Add your star to the universe</button
		>
	{/if}

	<BadgeUniverse
		uuid={uuid}
		data={badges}
		showLegend={!badgeAdded}
		bind:height={universeHeight}
	/>

	<div class="personality-flows">
		{#each names as name, i}
			<PersonalityFlow
				name={name}
				data={personalities.filter((d) => d.name === name)}
				careerImages={careerImages[name]}
				universeHeight={universeHeight}
				yearLabels={i === 0}
				flowLabels={flowLabels[name]}
			/>
		{/each}
	</div>

	<Footer />

	<Modal bind:isOpen={modalOpen}>
		<span slot="header">Create your own star</span>
		<BadgeConfigurator
			uuid={uuid}
			data={Array.from({ length: 9 }, () => 3)}
			on:sent={() => {
				modalOpen = false;
			}}
		/>
	</Modal>
</main>

<style>
	main {
		position: relative;
		width: 100%;
	}

	h2 {
		position: absolute;
		top: 16px;
		left: 50%;
		z-index: 500;
		margin: 0;
		padding: 1rem;
		transform: translateX(-50%);
		/* background: var(--background-color); */
		border: none;
		border-radius: 5px;
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
