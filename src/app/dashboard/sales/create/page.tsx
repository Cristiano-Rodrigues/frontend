import Breadcrumbs from "@/app/ui/dashboard/medicines/breadcrumbs";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";

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
  return (
    <div className="flex flex-col w-full h-full gap-4 p-6 bg-lightestGray overflow-y-auto">
      <div className="flex w-full">
        <Breadcrumbs breadcrumbs={breadcrumbs} />
      </div>
      <div className="w-full p-6 bg-white rounded-lg">
        <form className="flex flex-col gap-y-6">
          <p className="font-bold">Dados da venda</p>
          <div className="flex w-full gap-x-6">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="customer">
                Nome do cliente <span className="text-primary-100">*</span>
              </label>
              <input type="text" id="customer" placeholder="Cliente" className="p-3 bg-lightestGray rounded" />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="payment-type">
                Tipo de pagamento <span className="text-primary-100">*</span>
              </label>
              <select id="payment-type" className="p-3 bg-lightestGray rounded">
                <option value="card">Cartão</option>
                <option value="money">Dinheiro vivo</option>
                <option value="transfer">Transferência</option>
                <option value="other">Outro</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="paid-value">
              Valor pago <span className="text-primary-100">*</span>
            </label>
            <input type="number" min={0} step={0.1} id="paid-value" placeholder="Valor pago" className="p-3 bg-lightestGray rounded" />
          </div>
          <div className="flex flex-col gap-y-6 w-full rounded-lg">
            <p className="font-bold">Adicione itens à venda</p>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="product">
                Item <span className="text-primary-100">*</span>
              </label>
              <select id="product" className="p-3 bg-lightestGray rounded">
              </select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="amount">
                Quantidade <span className="text-primary-100">*</span>
              </label>
              <div className="flex gap-4 w-full">
                <input type="number" min={1} id="amount" placeholder="Quantidade" className="w-full p-3 bg-lightestGray rounded" />
                <button type="button" className="px-4 bg-primary-100 text-white rounded-lg">
                  <PlusIcon />
                </button>
              </div>
            </div>
            <div className="flex flex-col border rounded-lg">
              <div className="grid grid-cols-5 px-6 py-4 border-b font-bold">
                <p>Nome do item</p>
                <p>Quantidade</p>
                <p>Preço</p>
                <p>Total</p>
                <p>Ação</p>
              </div>

              <div>
                <div className="grid grid-cols-5 px-6 p-4 border-b">
                  <p className="flex items-center">Paracetamol</p>
                  <p className="flex items-center">3</p>
                  <p className="flex items-center">500</p>
                  <p className="flex items-center">1500</p>
                  <button type="button" className="flex items-center gap-1 w-min p-2 bg-red-100 text-red-500 rounded-lg">
                    <TrashIcon className="w-4 h-4" />
                    <p>Remover</p>
                  </button>
                </div>
                <div className="grid grid-cols-5 px-6 p-4 border-b">
                  <p className="flex items-center">Paracetamol</p>
                  <p className="flex items-center">3</p>
                  <p className="flex items-center">500</p>
                  <p className="flex items-center">1500</p>
                  <button type="button" className="flex items-center gap-1 w-min p-2 bg-red-100 text-red-500 rounded-lg">
                    <TrashIcon className="w-4 h-4" />
                    <p>Remover</p>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-5 px-6 py-4 font-bold">
                <p></p>
                <p className="col-span-2">Total de itens:</p>
                <p className="col-span-2">Total geral:</p>
              </div>
            </div>
          </div>
          <button type="submit" className="w-fit ml-auto px-6 py-2 bg-primary-100 text-white rounded mt-6">Cadastrar venda</button>
        </form>
      </div>
    </div>
  )
}