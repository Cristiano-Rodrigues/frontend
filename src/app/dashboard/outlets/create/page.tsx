import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";

const breadcrumbs = [
  {
    label: 'Home',
    href: '/dashboard',
    active: true,
  },
  {
    label: 'Pontos de venda',
    href: '/dashboard/outlets',
    active: true,
  },
  {
    label: 'Novo',
    href: '/dashboard/outlets/create',
    active: false,
  }
]

export default async function CreateMedicine () {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <form className="flex flex-col gap-y-6 items-end">
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="name">
              Nome <span className="text-primary-100">*</span>
            </label>
            <input type="text" id="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="type">
              Localização
            </label>
            <input type="text" id="type" placeholder="Localização" className="p-3 bg-lightestGray rounded" />
          </div>
          <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
        </form>
      </div>
    </div>
  )
}