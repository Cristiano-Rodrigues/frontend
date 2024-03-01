import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { CreateMedicineForm } from "@/app/ui/dashboard/medicines/create-form";

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
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray overflow-y-auto">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <CreateMedicineForm />
      </div>
    </div>
  )
}