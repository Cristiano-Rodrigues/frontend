import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { CreateSaleForm } from "@/app/ui/dashboard/sales/create-form";
import { getCurrentOutlet } from "@/lib/actions/cookies";
import { fetchAvailableProducts } from "@/lib/data/fetch";

const breadcrumbs = [
  {
    label: 'Home',
    href: '/dashboard',
    active: true,
  },
  {
    label: 'Vendas',
    href: '/dashboard/sales',
    active: true,
  },
  {
    label: 'Novo',
    href: '/dashboard/sales/create',
    active: false,
  }
]

export default async function CreateSale () {
  const outletId = await getCurrentOutlet()
  const products = await fetchAvailableProducts(outletId)

  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray overflow-y-auto">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <CreateSaleForm products={products} />
      </div>
    </div>
  )
}