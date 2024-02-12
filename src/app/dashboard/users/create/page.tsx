import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";

const breadcrumbs = [
  {
    label: 'Home',
    href: '/dashboard',
    active: true,
  },
  {
    label: 'Usuários',
    href: '/dashboard/users',
    active: true,
  },
  {
    label: 'Novo',
    href: '/dashboard/users/create',
    active: false,
  }
]

export default async function CreateUser () {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <form className="flex flex-col gap-y-6 items-end">
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name">
                Nome <span className="text-primary-100">*</span>
              </label>
              <input type="text" id="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="email">
                Email <span className="text-primary-100">*</span>
              </label>
              <input type="email" id="email" placeholder="Email" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="permission">
                Permissão <span className="text-primary-100">*</span>
              </label>
              <select defaultValue={'standard'} id="permission" className="p-3 bg-lightestGray rounded">
                <option value="standard">Padrão</option>
                <option value="manager">Gestor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="role">
                Função
              </label>
              <input type="text" id="role" placeholder="Função" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="contact">
                Contacto
              </label>
              <input type="text" id="contact" placeholder="Contacto" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="address">
                Endereço
              </label>
              <input type="text" id="address" placeholder="Endereço" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
        </form>
      </div>
    </div>
  )
}