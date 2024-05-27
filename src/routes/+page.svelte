<script>
	import { ProjectCard } from '$lib/components';
	export let data;
</script>

<div class="flex flex-col items-center justify-center min-h-screen ">

	<div class="my-10">
		<h1 class="text-4xl md:text-5xl lg:text-5xl font-bold  mb-2">
			Visita tu
		</h1>
		<a href="/my/projects" class="btn btn-info btn-wide btn-md">
			Play list
		</a>
		<p class="text-lg text-gray-300 mt-2">
			y disfruta de los videos infantiles.
		</p>
	</div>

	<div class="flex flex-col gap-3 mt-10">
		<h1 class="text-4xl font-bold">Los recienes</h1>
		<div class="grid grid-cols-3 gap-5">
			{#each data.projects as project}
			<ProjectCard {project} />
			{/each}
		</div>
	</div>
</div>


















