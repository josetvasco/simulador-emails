document.addEventListener('DOMContentLoaded', () => {

  const email = {
    email: '',
    ccemail: '',
    asunto: '',
    mensaje: ''
  } 

  // Seleccionar los elementos del interfaz
  const inputEmail = document.querySelector('#email');
  const inputCC = document.querySelector('#ccemail');
  const inputAsunto = document.querySelector('#asunto');
  const inputMensaje = document.querySelector('#mensaje');
  const formulario = document.querySelector('#formulario');
  const btnSubmit = document.querySelector('#formulario button[type="submit"]');
  const btnReset = document.querySelector('#formulario button[type="reset"]');
  const spinner = document.querySelector('#spinner');

  // Asignar eventos
  inputEmail.addEventListener('blur', validar);
  inputAsunto.addEventListener('blur', validar); 
  inputMensaje.addEventListener('input', validar);
  inputMensaje.addEventListener('blur', validar);
  inputCC.addEventListener('blur', comprobarCC);

  formulario.addEventListener('submit', enviarEmail);

  btnReset.addEventListener('clcik', function(e) {
    e.preventDefault();

    resetFormulario();
  })

  function enviarEmail(e) {
    e.preventDefault();

    spinner.classList.add('flex');
    spinner.classList.remove('hidden');

    setTimeout(() => {
      spinner.classList.add('hidden');
      spinner.classList.remove('flex');

      resetFormulario();

      // Crear alerta
      const alertaExito = document.createElement('P');
      alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');

      alertaExito.textContent = 'Mensaje enviado correctamente';

      formulario.appendChild(alertaExito);

      setTimeout(() => {
        alertaExito.remove();
      }, 3000);
    }, 3000);
  }

  function validar(e) {
    if(e.target.value.trim() === '') {
      mostrarAlerta(`El campo de ${e.target.id} es obligatorio`, e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }

    if(e.target.id === 'email' && !validarEmail(e.target.value)) {
      mostrarAlerta('Email no es válido', e.target.parentElement);
      email[e.target.name] = '';
      comprobarEmail();
      return;
    }
    
    limpiarHTML(e.target.parentElement);

    // Asignar los valores
    email[e.target.name] = e.target.value.trim().toLowerCase();

    // Comprobar el onjeto de email
    comprobarEmail();
  }

  function mostrarAlerta(mensaje, padre) {
    // Comprueba si ya existe la alerta
    limpiarHTML(padre);

    // Generar alerta en HTML
    const error = document.createElement('P');
    error.textContent = mensaje;
    error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

    // Inyectar el mensaje en su elemento padre
    padre.appendChild(error)
  }

  function limpiarHTML( padre ) {
    const alerta = padre.querySelector('.bg-red-600');

    if( alerta ){
      alerta.remove();
    }
  }

  function validarEmail( email ) {
    const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    return resultado;
  }

  function comprobarEmail () {
    if(email.ccemail == '') {
      delete email.ccemail;
    }

    if(Object.values(email).includes('')) {
      btnSubmit.classList.add('opacity-50');
      btnSubmit.disabled = true;
    } else {
      btnSubmit.classList.remove('opacity-50');
      btnSubmit.disabled = false;
    }
  }

  function resetFormulario() {
    // Reinicar el objeto
    email.email = '';
    email.ccemail = '';
    email.asunto = '';
    email.mensaje = '';

    formulario.reset();
    comprobarEmail();
  }

  function comprobarCC(e) {
    email[e.target.name] = e.target.value.trim().toLowerCase();
    // Comprobar email cc
    if(e.target.id === 'ccemail' && !validarEmail(e.target.value) && e.target.value !== '') {
      mostrarAlerta('Email no es válido', e.target.parentElement);
      comprobarEmail();
    } else {
      comprobarEmail()
      limpiarHTML(e.target.parentElement);
    }
  }

});