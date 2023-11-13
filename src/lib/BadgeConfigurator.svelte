<script>
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	const dispatch = createEventDispatcher();

	const minInputValue = 0;
	const maxInputValue = 5;

	const inputs = [
		{
			id: 'data-collection',
			label:
				'Data collection - Scraping or obtaining data that is not provided in an easy format',
		},
		{
			id: 'data-cleaning',
			label: 'Data cleaning - Tidying data to make it easier to work with',
		},
		{
			id: 'data-analysis',
			label: 'Data analysis - Modeling data to discover new information',
		},
		{
			id: 'visualization-building',
			label:
				'Visualization building - Creating data visualizations using code or tools',
		},
		{
			id: 'visualization-design',
			label:
				'Visualization design - Evaluating needs, and creating visual concepts',
		},
		{
			id: 'visualization-storytelling',
			label: 'Visualization storytelling - Creating compelling narratives',
		},
		{
			id: 'society-management',
			label: 'Society project management - Planning and organizing work',
		},
		{
			id: 'society-community',
			label: 'Society community - Participating in events and conversation',
		},
		{
			id: 'society-leadership',
			label: 'Society leadership - Influencing the direction',
		},
	];

	// const meanings = {
	// 	0: 'Novice (little or no exposure to this topic)',
	// 	1: 'Learning (aware of the basic concepts and interested to know more)',
	// 	2: 'Beginning (taken a course or begun applying examples)',
	// 	3: 'Intermediate (understand and applying these techniques)',
	// 	4: 'Advanced (regularly apply and feel comfortable teaching or explaining)',
	// 	5: 'Expert (You feel you’re amazing at this topic and put a lot of time and energy on continual advancement)',
	// };

	const meanings = {
		0: 'Novice',
		1: 'Learning',
		2: 'Beginning',
		3: 'Intermediate',
		4: 'Advanced',
		5: 'Expert',
	};

	export let data = Array.from({ length: inputs.length }, () => 0);
</script>

<div class="badge-configurator">
	<p>
		Rank yourself on 9 measures pertaining to data, visualization and society.
	</p>

	<form
		action="?/addBadge"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				dispatch('sent');
				invalidateAll();
			};
		}}
	>
		{#each inputs as { id, label }, i}
			<label
				for={id}
				class="category-description">{label}</label
			>
			<label
				for={id}
				class="value-description">{data[i]} - {meanings[data[i]]}</label
			>
			<input
				type="range"
				min={minInputValue}
				max={maxInputValue}
				bind:value={data[i]}
				class="slider"
				id={id}
			/>
		{/each}
		<input
			type="hidden"
			id="values"
			name="values"
			value={data}
		/>
		<button type="submit">Add your badge</button>
	</form>
</div>

<style>
	.badge-configurator {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	p {
		font-weight: bold;
	}

	label.value-description {
		font-size: 0.8rem;
	}
</style>
