const userData = {
  first_name:'admin',
  last_name:'admin',
  username: 'admin',
  email: 'admin@admin.com',
  age: 'admin',
  password: 'admin',
  cart:'admin',
  rol: 'admin'
}

const result = await fetch('http://localhost:8080/api/users', {
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(userData)
})

console.log(result.status)

export { }