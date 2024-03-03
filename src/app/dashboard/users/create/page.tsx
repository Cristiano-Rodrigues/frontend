import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { CreateUserForm } from "@/app/ui/dashboard/users/create-form";

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
        <CreateUserForm />
      </div>
    </div>
  )
}