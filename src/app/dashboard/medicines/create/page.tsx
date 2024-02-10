import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";

const breadcrumbs = [
  {
    label: 'Home',
    href: '/dashboard',
    active: true,
  },
  {
    label: 'Remédios e diversos',
    href: '/dashboard/medicines',
    active: true,
  },
  {
    label: 'Novo',
    href: '/dashboard/medicines/create',
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
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="name">
                Nome <span className="text-primary-100">*</span>
              </label>
              <input type="text" id="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="type">
                Tipo <span className="text-primary-100">*</span>
              </label>
              <input type="text" id="type" placeholder="Tipo" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="origin">
                Origem <span className="text-primary-100">*</span>
              </label>
              <input type="text" id="origin" placeholder="Origem" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="designation">
                Designação
              </label>
              <input type="text" id="designation" placeholder="Designação" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="weight">
                Peso (mg)
              </label>
              <input type="number" min={0} id="weight" placeholder="Peso em miligramas" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="expiration">
                Expiração
              </label>
              <input type="date" id="expiration" placeholder="Expiração" className="p-3 bg-lightestGray rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="price">
              Preço <span className="text-primary-100">*</span>
            </label>
            <input type="number" min={0} id="price" placeholder="Preço" className="p-3 bg-lightestGray rounded" />
          </div>
          <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar remédio</button>
        </form>
      </div>
    </div>
  )
}