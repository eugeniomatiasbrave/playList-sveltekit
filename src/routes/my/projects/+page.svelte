<script>
	import { MyProjectItem } from '$lib/components';
	export let data;
</script>

<h2 class="text-3xl font-bold">Mi Play List</h2>
<div class="w-full mt-4 flex flex-col items-center">
	{#if data.projects.length === 0}
		<p class="text-center text-3xl">☹️</p>
		<p class="text-center text-3xl">Parece que no tienes ningún Video.</p>
		<a href="/projects/new" class="btn btn-primary max-w-md mt-4">Agrega uno</a>
	{:else}
		{#each data.projects as project}
			<MyProjectItem {project} />
			<div class="divider mt-0 mb-2" />
		{/each}
	{/if}
</div>