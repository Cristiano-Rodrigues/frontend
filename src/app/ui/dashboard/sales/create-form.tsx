'use client'

import { useState } from "react";
import { ItemsForm } from "./items-form";
import { Product, Item } from "@/lib/definitions";
import { useFormState } from "react-dom";
import { State, registerSale } from "@/lib/actions/register/sales";

export function CreateSaleForm ({ products }: { products: Product[] }) {
  const wrapper = async (prevState: State, formData: FormData) => {
    return await registerSale(items, prevState, formData)
  }

  const [items, setItems] = useState<Item[]>([])
  const [state, dispatch] = useFormState(wrapper, {
    success: false,
    message: ''
  })

  const handleAddItem = (item: Item) => {
    setItems(items => [item].concat(items))
  }
  const handleRemoveItem = (id: string) => {
    setItems(items => items.filter(i => i.id !== id))
  }

  return (
    <form action={dispatch} className="flex flex-col gap-y-6">
      {
        state.success && (
          <div className="flex flex-col gap-y-2 w-full bg-green-100 p-4 rounded-sm">
            Venda cadastrada com sucesso!
          </div>
        )
      }
      {
        state.errors && (
          <div className="flex flex-col gap-y-2 w-full bg-red-200 p-4 rounded-sm">
            {
              state.errors?.customerName?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
            {
              state.errors?.paidValue?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
            {
              state.errors?.paymentType?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
          </div>
        )
      }
      {
        state.message && (
          <div className="flex flex-col gap-y-2 w-full bg-red-200 p-4 rounded-sm">
            <p>{state.message}</p>
          </div>
        )
      }
      <p className="font-bold">Dados da venda</p>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="customer">
            Nome do cliente <span className="text-primary-100">*</span>
          </label>
          <input type="text" name="customer-name" id="customer" placeholder="Cliente" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="payment-type">
            Tipo de pagamento <span className="text-primary-100">*</span>
          </label>
          <select name="payment-type" id="payment-type" className="p-3 bg-lightestGray rounded">
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
        <input name="paid-value" type="number" min={0} step={0.1} id="paid-value" placeholder="Valor pago" className="p-3 bg-lightestGray rounded" />
      </div>
      <ItemsForm
        products={products}
        items={items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
      />
      <button type="submit" className="w-fit ml-auto px-6 py-2 bg-primary-100 text-white rounded mt-6">Cadastrar venda</button>
    </form>
  )
}