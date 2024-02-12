import { Product, Item } from "@/lib/definitions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "lucide-react";
import { useState } from "react";

export function ItemsForm ({
  products,
  items,
  handleAddItem,
  handleRemoveItem
}: {
  products: Product[];
  items: Item[];
  handleAddItem: (item: Item) => void
  handleRemoveItem: (id: string) => void
}) {
  const [item, setItem] = useState<Item>({
    id: products[0].id,
    name: products[0].name,
    amount: 1,
    price: Number(products[0].price)
  })

  return (
    <div className="flex flex-col gap-y-6 w-full rounded-lg">
      <p className="font-bold">Adicione itens à venda</p>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="product">
          Item <span className="text-primary-100">*</span>
        </label>
        <select
          id="product" className="p-3 bg-lightestGray rounded"
          defaultValue={item.name}
          onChange={e => setItem(item => ({
            ...item,
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            price: Number(products.find(p => p.id == e.target.value)?.price)
          }))}
        >
          {
            products.map(({ id, name }) => (
              <option key={id} value={id}>{ name }</option>
            ))
          }
        </select>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="amount">
          Quantidade <span className="text-primary-100">*</span>
        </label>
        <div className="flex gap-4 w-full">
          <input
            type="number"
            min={1} id="amount" placeholder="Quantidade"
            className="w-full p-3 bg-lightestGray rounded"
            value={item.amount}
            onChange={e => setItem(item => ({
              ...item,
              amount: Number(e.target.value)
            }))}
          />
          <button
            type="button"
            className="px-4 bg-primary-100 text-white rounded-lg"
            onClick={() => {
              handleAddItem(item)
            }}
          >
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

        <div className="flex flex-col">
          {
            items.map(item => (
              <div key={item.name} className="grid grid-cols-5 px-6 p-4 border-b">
                <p className="flex items-center">{ item.name }</p>
                <p className="flex items-center">{ item.amount }</p>
                <p className="flex items-center">{ item.price }</p>
                <p className="flex items-center">{ item.amount * item.price }</p>
                <button
                  type="button"
                  className="flex items-center gap-1 w-min p-2 bg-red-100 text-red-500 rounded-lg"
                  onClick={() => {
                    handleRemoveItem(item.id)
                  }}
                >
                  <TrashIcon className="w-4 h-4" />
                  <p>Remover</p>
                </button>
              </div>
            ))
          }
        </div>

        <div className="grid grid-cols-5 px-6 py-4 font-bold">
          <p></p>
          <p className="col-span-2">
            Total de itens: <span className="font-normal">{
              items.reduce((total, item) => total + item.amount, 0)
            }</span>
          </p>
          <p className="col-span-2">
            Total geral: <span className="font-normal">{
              items.reduce((total, item) => (
                total + item.amount * item.price
              ), 0)
            }</span>
          </p>
        </div>
      </div>
    </div>
  )
}