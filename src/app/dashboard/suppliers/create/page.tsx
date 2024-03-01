import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { CreateSupplierForm } from "@/app/ui/dashboard/suppliers/create-form";

const breadcrumbs = [
  {
    label: 'Home',
    href: '/dashboard',
    active: true,
  },
  {
    label: 'Fornecedores',
    href: '/dashboard/suppliers',
    active: true,
  },
  {
    label: 'Novo',
    href: '/dashboard/suppliers/create',
    active: false,
  }
]

export default async function CreateSupplier () {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <CreateSupplierForm />
      </div>
    </div>
  )
}