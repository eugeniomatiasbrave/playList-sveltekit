<script>
	import { Input } from '$lib/components';
	export let form;
</script>

<div class="flex flex-col items-center h-full w-full">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Regístrese para obtener una cuenta
	</h2>
	<p class="text-center mt-1">
		O <a href="/login" class="text-info font-medium hover:cursor-pointer hover:underline"
			>iniciar sesión</a
		> si ya tienes una cuenta.
	</p>
	<form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
		
		<Input id="name" label="Name" value={form?.data?.name} errors={form?.errors?.name} />
		<Input type="email" id="email" label="Email" value={form?.data?.email} errors={form?.errors?.email}/>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password}/>
		<Input type="password" id="passwordConfirm" label="Confirmar Password" value={form?.data?.passwordConfirm} errors={form?.errors?.passwordConfirm}/>

		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-outline btn-info w-full">Registro</button>
		</div>
    
	</form>
</div>