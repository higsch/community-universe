<script>
	import { createEventDispatcher } from 'svelte';
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import ScoringInput from './ScoringInput.svelte';

	const dispatch = createEventDispatcher();

	const minInputValue = 0;
	const maxInputValue = 5;

	const inputs = [
		{
			id: 'data-collection',
			label:
				'Data: Collection - Scraping or obtaining data that is not provided in an easy format',
		},
		{
			id: 'data-cleaning',
			label: 'Data: Cleaning - Tidying data to make it easier to work with',
		},
		{
			id: 'data-analysis',
			label: 'Data: Analysis - Modeling data to discover new information',
		},
		{
			id: 'visualization-building',
			label:
				'Visualization: Building - Creating data visualizations using code or tools',
		},
		{
			id: 'visualization-design',
			label:
				'Visualization: Design - Evaluating needs, and creating visual concepts',
		},
		{
			id: 'visualization-storytelling',
			label: 'Visualization: Storytelling - Creating compelling narratives',
		},
		{
			id: 'society-management',
			label: 'Society: Project management - Planning and organizing work',
		},
		{
			id: 'society-community',
			label: 'Society: Community - Participating in events and conversation',
		},
		{
			id: 'society-leadership',
			label: 'Society: Leadership - Influencing the direction',
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
	export let uuid;
</script>

<div class="badge-configurator">
	<p>
		Rank yourself on 9 measures pertaining to data, visualization and society.
	</p>

	<form
		action="?/addBadge"
		method="POST"
		use:enhance={() => {
			return async () => {
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
			<!-- <input
				type="range"
				min={minInputValue}
				max={maxInputValue}
				bind:value={data[i]}
				class="slider"
				id={id}
			/> -->
			<ScoringInput
				id={id}
				options={[1, 2, 3, 4, 5]}
				bind:value={data[i]}
			/>
		{/each}
		<input
			type="text"
			id="user_name"
			name="user_name"
			placeholder="Optional: Enter your name"
		/>
		<input
			type="hidden"
			id="user_id"
			name="user_id"
			value={uuid}
		/>
		<input
			type="hidden"
			id="values"
			name="values"
			value={data}
		/>
		<button type="submit">Add your star</button>
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

	input#user_name {
		margin: 1rem 0;
	}
</style>
