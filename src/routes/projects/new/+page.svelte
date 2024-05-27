<script>
	import { enhance } from '$app/forms';
	import { Input , TextArea} from '$lib/components';

	export let form;
</script>

<div class="flex flex-col w-full h-full p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
			>
			<h3 class="text-3xl font-bold">Cuéntanos más sobre este video</h3>
			<p class="mt-2 text-lg">Necesitaremos el nombre, el autor, el enlace y la descripción.</p>
			<Input id="name" label="Nombre del Video" value={form?.data?.name} errors={form?.errors?.name} />
			<Input id="tagline" label="Autor" value={form?.data?.tagline} errors={form?.errors?.tagline}/>	
			<Input id="url" label="URL del Video" value={form?.data?.url} errors={form?.errors?.url}/>

			<TextArea
				id="description"
				label="Descripción del Video"
				value={form?.data?.description}
				errors={form?.errors?.description}/>
			
			<Input type="file" id="thumbnail" label="Thumbnail" errors={form?.errors?.thumbnail}/>
			
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-info w-full max-w-lg">Agregar a mi lista de Video</button>
			</div>
		</form>
	</div>
</div>