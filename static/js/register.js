const idCarrito = JSON.parse(localStorage.getItem('carrito'))
console.log(idCarrito)
document.getElementById('carritoID').value= idCarrito

const formLogin = document.getElementById('register')

formLogin?.addEventListener('submit', async event => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  try {
    const res = await fetch(
      '/api/users',
      {
        method:'POST',
        body: formDataEncoded,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      },
    )
     // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
     if (res.ok) {
      // Redirigir a la nueva página
      //
        Swal.fire({
          title: "Usuario registrado!",
          icon: "success",
          color: "write"
        });
        window.location.href = '/login'
    } else {
      // Manejar otros casos si es necesario
      console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
    }

  } catch (err) {
    console.log(err.message)
  }
})