const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	codigo: /^[0-9]{8}$/, // / 7 digitos numericos y que no empiece por 0
	fecha: /^(0[1-9]|[1-2]\d|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/,
	direccion: /^\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenida|Carril|Carretera|Calle|Cra|Dr|C|K|Barrio|B)\.?$/,
	telefono_fijo: /^[0-9]{7}$/,
	telefono: /^[3][0-9]{9}$/, // 7 a 14 numeros.
	correo: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
    
}

const espacios = {
	nombre: false,
	codigo: false, 
	fecha: false,
	direccion: false,
	telefono_fijo: false,
	telefono: false,
	correo: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
				validarEspacio(expresiones.nombre, e.target, 'nombre');
		break;
		case "codigo":
				validarEspacio(expresiones.codigo, e.target, 'codigo');
		break;
		case "fecha":
				validarEspacio(expresiones.fecha, e.target, 'fecha');
		break;
		case "direccion":
				validarEspacio(expresiones.direccion, e.target, 'direccion');
		break;
		case "telefono_fijo":
				validarEspacio(expresiones.telefono_fijo, e.target, 'telefono_fijo');
		break;
		case "telefono":
				validarEspacio(expresiones.telefono, e.target, 'telefono');
		break;
		case "correo":
				validarEspacio(expresiones.correo, e.target, 'correo');
		break;
	}
}

const validarEspacio = (expresion, input, espacio) => {
	if(expresion.test(input.value)){
		document.getElementById(`parte_${espacio}`).classList.remove('formulario_parte-incorrecto');
		document.getElementById(`parte_${espacio}`).classList.add('formulario_parte-correcto');
		document.querySelector(`#parte_${espacio} i`).classList.add('fa-check-circle');
		document.querySelector(`#parte_${espacio} i`).classList.remove('fa-check-circle');
		espacios[espacio] = true;

	} else {
		document.getElementById(`parte_${espacio}`).classList.add('formulario_parte-incorrecto');
		document.getElementById(`parte_${espacio}`).classList.remove('formulario_parte-correcto');
		document.querySelector(`#parte_${espacio} i`).classList.add('fa-times-circle');
		document.querySelector(`#parte_${espacio} i`).classList.remove('fa-check-circle');
		espacios[espacio] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup',validarFormulario);
	input.addEventListener('blur',validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if (espacios.nombre && espacios.codigo && espacios.fecha && espacios.direccion && espacios.telefono_fijo && espacios.telefono && espacios.correo){
		formulario.reset(); 
	}
});