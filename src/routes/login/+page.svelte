<script>
	import { enhance } from '$app/forms';
	import {Input} from '$lib/components';
	import toast from 'svelte-french-toast';
	
	export let form;

	let loading= false

	const submitLogin = () => {
		loading = true;
		return async ({ result, update }) => {
		switch (result.type) {
			case 'success':
				await update();
				break;
			case 'failure':
				toast.error('Invalid credentials');
				await update();
				break;
			case 'error':
				toast.error(result.error.message);
				break;
			default:
				await update();
		}
		loading = false;
	  };	
	};

</script>

<div class="flex flex-col items-center h-full w-full ">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Ingrese a su cuenta
	</h2>
	<p class="text-center mt-1">
		O <a href="/register" class="text-info font-medium hover:cursor-pointer hover:underline"
			>a Register</a> si aún no tienes una cuenta.
	</p>
	<form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full max-w-md pt-4" use:enhance={submitLogin}>
		<Input 
		   type="email"
		   id="email" label="Email" 
		  value={form?.data?.email ?? ''} 
		  errors={form?.errors?.email} 
		  disabled={loading}
		/> <!--el error sera de la validacion zod-->
		<Input 
		   type="password" id="password" label="Password" 
		   errors={form?.errors?.password} 
		   disabled={loading}
		   /> <!--Value queda vacio para que no devuelva la contraseña-->
		<div class="w-full max-w-md">
			<a href="/resetPassword" class="font-medium text-info hover:cursor-pointer hover:underline">Olvide mi Password?</a>
		</div>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-outline btn-info w-full" disabled={loading} >LOGIN</button>
		</div>
  {#if form?.notVerified}
    <div class="alert alert-error shadow-lg w-full max-w-md">
	  <div>
		<svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
		</svg>
		<span>Debe verificar su correo electrónico antes de poder iniciar sesión.</span>
	  </div>
    </div>
  {/if}
 </form>
</div>