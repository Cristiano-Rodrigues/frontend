import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { CreateOutletForm } from "@/app/ui/dashboard/outlets/create-form";

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

export default async function CreateOulet () {
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <CreateOutletForm />
      </div>
    </div>
  )
}