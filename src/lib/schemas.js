import { z } from 'zod';

export const loginUserSchema = z.object({
	email: z
	.string({ required_error: 'El Email es requerido' })
	.email({ message: 'El Email debe ser valido.' }),
	password: z.string({ required_error: 'El Password es requerido' })
});

export const registerUserSchema = z
	.object({
		name: z
			.string({ required_error: 'El nombre es requerido' })
			.regex(/^[a-zA-z\s]*$/, { message: 'El nombre sólo puede contener letras y espacios.' })
			.min(2, { message: 'El nombre debe tener al menos 2 caracteres.' })
			.max(64, { message: 'El nombre debe tener menos de 64 caracteres.' })
			.trim(),
		email: z
			.string({ required_error: 'El Email es requerido' })
			.email({ message: 'El Email debe ser valido.' }),
		password: z
			.string({ required_error: 'El Password es requerido' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:'La contraseña debe tener un mínimo de 8 caracteres y contener al menos una letra, un número y un carácter especial.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Se requiere contraseña de confirmación' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'La contraseña debe tener un mínimo de 8 caracteres y contener al menos una letra, un número y un carácter especial.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'La contraseña y la confirmación de contraseña deben coincidir',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'La contraseña y la confirmación de contraseña deben coincidir',
				path: ['passwordConfirm']
			});
		}
	});

	const imageTypes = [
		'image/jpeg',
		'image/jpg',
		'image/png',
		'image/webp',
		'image/svg+xml',
		'image/gif'
	];

	export const createProjectSchema = z.object({
		name: z
			.string({ required_error: 'Name is required' })
			.min(1, { message: 'Name is required' })
			.max(64, { message: 'Name must be 64 characters or less' })
			.trim(),
		tagline: z
			.string({ required_error: 'Tagline is required' })
			.min(1, { message: 'Tagline is required' })
			.max(64, { message: 'Tagline must be 64 characters or less' })
			.trim(),
		url: z.string({ required_error: 'URL is required' }).url({ message: 'URL must be a valid URL' }),
		description: z
			.string({ required_error: 'Description is required' })
			.min(1, { message: 'Description is required' })
			.max(512, { message: 'Description must be less than 512 characters' })
			.trim(),
		thumbnail: z
			.instanceof(Blob)
			.optional()
			.superRefine((val, ctx) => {
				if (val) {
					if (val.size > 5242880) { // 5MB
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Thumbnail must be less than 5MB'
						});
					}
	
					if (!imageTypes.includes(val.type)) {
						ctx.addIssue({
							code: z.ZodIssueCode.custom,
							message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
						});
					}
				}
			}),
		user: z.string({ required_error: 'User is required.' })
	});
	

// “BLOB” es la abreviatura de “Binary Large Objects” (en español, objeto binario grande). 
//En informática, un BLOB se refiere a un tipo de datos que puede almacenar una cantidad 
//variable de datos en forma binaria1. Los BLOB se utilizan principalmente en bases de datos y 
// proyectos de código abierto para almacenar archivos binarios2. Estos archivos pueden contener 
//no solo caracteres imprimibles, sino también patrones de bits arbitrarios2. Los ejemplos más 
//típicos de este tipo de archivos son los de imagen o audio, los archivos comprimidos o los datos
// para hojas de cálculo2.

// Cuando se dice “cuando regrese al servidor será un blob”, se está refiriendo a que los datos 
//que se envían al servidor se almacenarán como un BLOB. Esto es común cuando se manejan datos 
//no estructurados o binarios, como imágenes, audio, video, etc. Los BLOB se almacenan en zonas de
// almacenamiento no jerárquicas llamadas lagos de datos3.

//Es importante tener en cuenta que las bases de datos no pueden leer ni comprender el contenido 
//no estructurado de los BLOB, sino que los han de almacenar como un todo y solo pueden leer el 
//nombre de archivo, el tipo de archivo y el tamaño de archivo del BLOB2. Por lo tanto, al trabajar
// con objetos binarios grandes, las bases de datos no pueden realizar sus funciones propias, tales
// como clasificar, filtrar o buscar contenido2.


export const updateProjectSchema = createProjectSchema.omit({ user: true });


export const updateEmailSchema = z.object({
	email: z
		.string({ required_error: 'Email is required' })
		.email({ message: 'Email must be a valid email' })
});

export const updateUsernameSchema = z.object({
	username: z
		.string({ required_error: 'Username is required' })
		.min(3, { message: 'Username must be at least 3 characters' })
		.max(24, { message: 'Username must be 24 characters or less' })
		.regex(/^[a-zA-Z0-9]*$/, { message: 'Username can only contain letters or numbers.' })
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string({ required_error: 'Old password is required' }),
		password: z
			.string({ required_error: 'Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			}),
		passwordConfirm: z
			.string({ required_error: 'Confirm Password is required' })
			.regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
				message:
					'Password must be a minimum of 8 characters & contain at least one letter, one number, and one special character.'
			})
	})
	.superRefine(({ passwordConfirm, password }, ctx) => {
		if (passwordConfirm !== password) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['password']
			});
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Password & Confirm password must match',
				path: ['passwordConfirm']
			});
		}
	});

export const updateProfileSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(1, { message: 'Name is required' })
		.max(64, { message: 'Name must be 64 characters or less' })
		.trim(),
	avatar: z
		.instanceof(Blob)
		.optional()
		.superRefine((val, ctx) => {
			if (val) {
				if (val.size > 5242880) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Avatar must be less than 5MB'
					});
				}

				if (!imageTypes.includes(val.type)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Unsupported file type. Supported formats: jpeg, jpg, png, webp, svg, gif'
					});
				}
			}
		})
});