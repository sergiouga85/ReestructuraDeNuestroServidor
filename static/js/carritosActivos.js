const rutaFetch = 'http://localhost:8080/api/carritos'
const rutaFetchNewCarrito = 'http://localhost:8080/api/carritos'

document.getElementById('newCarrito').addEventListener('click', newCarrito)

loadCarritos()

function loadCarritos() {

    fetch(rutaFetch)
        .then(resp => resp.json())
        .then(data => {
            const targetDOM = document.getElementById('listaCarritos')
            targetDOM.addEventListener('click', selectCarrito)
            targetDOM.innerHTML = ''

            if (data.length > 0) {
                for (elem of data) {
                    const newElement = document.createElement('tr')
                    newElement.innerHTML = `
                <th scope="row" style="vertical-align: middle;">${elem._id}</th>
                <td style="vertical-align: middle;">Subtotal products: ${elem.carrito.length}</td>
                <td style="vertical-align: middle;">
                <input type="radio" class="btn-check" name="options-outlined" id=${elem._id} autocomplete="off">
                <label class="btn btn-outline-success" for="success-outlined" id=${elem._id}>Continuar</label>
                </td>
                `
                    targetDOM.appendChild(newElement)
                }
            } else {
                targetDOM.innerHTML = `
                <div class="alert alert-success" role="alert">
                    No hay carritos activos. Crea uno nuevo!
                </div>
                `
            }
            console.log(data)
        })
}


function selectCarrito(e) {
    if (e.target.id != '') {
        console.log(e.target.id)
        //document.getElementById('carritoActivo').value = e.target.id
        localStorage.setItem('carrito', JSON.stringify(e.target.id))
        //console.log(document.getElementById('carritoActivo').value)
        window.location = '/productos'
    }
}

function newCarrito(e) {
    fetch(rutaFetchNewCarrito, {
        method: 'POST'
    })
        .then(resp => resp.json())
        .then(data => {
            const newID = data._id
            console.log(newID)
            localStorage.setItem('carrito', JSON.stringify(newID))
            window.location = '/productos'
        })

}

const buttonLogout = document.getElementById('logout')

buttonLogout?.addEventListener('click', async event => {
  event.preventDefault() 

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