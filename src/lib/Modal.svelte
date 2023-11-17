<script>
	export let isOpen = false;
</script>

<dialog open={isOpen}>
	<article>
		<header>
			<slot name="header" />
			<!-- svelte-ignore a11y-invalid-attribute -->
			<!-- svelte-ignore a11y-missing-content -->
			<a
				class="close"
				href="javascript:void(0)"
				on:click={() => (isOpen = false)}
			></a>
		</header>
		<section>
			<slot />
		</section>
		<!-- <footer>
			<slot name="footer" />
		</footer> -->
	</article>
</dialog>

<style>
	dialog {
		padding-top: 48px;
	}

	article {
		max-height: calc(100vh - 96px);
	}

	section {
		margin-bottom: 0;
	}

	a {
		cursor: pointer;
	}
</style>
