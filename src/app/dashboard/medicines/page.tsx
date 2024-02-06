import { Dropdown } from "@/app/ui/dashboard/medicines/dropdown";
import { CustomTable } from "@/app/ui/dashboard/medicines/table";
import { fetchProducts } from "@/lib/data/fetch";
import { PlusIcon } from "@heroicons/react/24/outline";

export default async function Medicines () {
  const products = (await fetchProducts()).map(({ outlet_id, ...p }) => ({
    ...p,
    expiration: p?.expiration?.toLocaleDateString()
  }))

  return (
    <div className="relative flex w-full h-full">
      <div className="flex flex-col gap-4 w-full h-full p-6 bg-lightestGray">
        <div className="flex flex-col gap-2 justify-between w-full md:flex-row">
          <div className="flex items-center">
            <h3 className="text-xl font-bold">Lista de Remédios</h3>
          </div>
          <div className="flex gap-2">
            <input
              className="p-2 text-sm w-[250px] border-none rounded-md"
              type="search"
              placeholder="Pesquise aqui"
            />
            <div className="flex justify-center items-center px-4 py-1 rounded-md bg-white">
              <Dropdown />
            </div>
            <button
              className="flex justify-between items-center gap-2 p-2 bg-primary-25 rounded-md"
            >
              <p className="hidden md:block">Novo remédio</p>
              <PlusIcon className="w-5 h-5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>
        <CustomTable
          columns={
            ['Nome', 'Designação', 'Tipo', 'Origem', 'Peso', 'Expiração' ]
          }
          data={products}
        />
      </div>
      <div className="absolute  w-[355px] bg-mediumLightGray"></div>
    </div>
  )
}