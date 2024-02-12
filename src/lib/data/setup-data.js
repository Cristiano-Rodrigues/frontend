const users = [
  {
    id: '9ea76dab-72bd-4e3d-b861-b0251a31a16e',
    name: 'Usuário Administrador',
    email: 'email@server.com',
    password: process.env.ADMIN_USER_PASS,
    permission: 'admin'
  }
]

const outlets = [
  {
    id: '011a8dd5-6746-4a82-9010-e6a4694db644',
    name: 'Farmácia I',
    location: 'Luanda - Angola'
  }
]

module.exports = {
  users,
  outlets
}