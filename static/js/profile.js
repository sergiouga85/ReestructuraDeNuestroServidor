window.addEventListener('load', async () => {
    const response = await fetch('/api/users/current')
    if (response.status !== 200) {
      alert('necesitas loguearte para ver esta info!')
      return (window.location.href = '/login')
    }
  
    const result = await response.json()
    const usuario = result.payload
  
    document.getElementById('nombre').value= usuario.first_name
    document.getElementById('apellido').value= usuario.last_name
    document.getElementById('email').value= usuario.email 
  })
  
  const buttonLogout = document.getElementById('logout')
  
  buttonLogout?.addEventListener('click', async event => {
    event.preventDefault()
  
    // @ts-ignore
    //const formDataEncoded = new URLSearchParams(new FormData(formLogin))
  
    try {
      const res = await fetch(
        '/api/sessions/current',
        {
          method: 'DELETE',
        },
      )
  
      // Verificar si la solicitud fue exitosa (código de respuesta 2xx)
      if (res.ok) {
        // Redirigir a la nueva página
        window.location.href = '/login'
      } else {
        // Manejar otros casos si es necesario
        console.log('La solicitud no fue exitosa. Código de respuesta:', res.status)
      }
  
    } catch (err) {
      console.log(err.message)
    }
  })