const formLogin = document.getElementById('login')

formLogin?.addEventListener('submit', async (event) => {
  event.preventDefault()

  // @ts-ignore
  const formDataEncoded = new URLSearchParams(new FormData(formLogin))

  const response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    // @ts-ignore
    body: new URLSearchParams(new FormData(formLogin))
  })

  if (response.status === 201) {
    window.location.href = '/carritosActivos'
  } else {
    Swal.fire({
      title: "Fallo de inicio",
      icon: "error",
      color: "write",
      text: "Ingresar usuario y contraseña!"
    });
    
  }
});

document.getElementById('btnRegister').addEventListener('click', newCarrito)
function newCarrito(e) {
    fetch('http://localhost:8080/api/carritos', {
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(data => {
            const newID = data._id
            console.log(newID)
            localStorage.setItem('carrito', JSON.stringify(newID))
            window.location = '/register'
        })
  
  }