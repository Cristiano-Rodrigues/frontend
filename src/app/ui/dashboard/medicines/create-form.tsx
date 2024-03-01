'use client'

import { registerProduct } from "@/lib/actions/register/products";
import { useFormState } from "react-dom";

export function CreateMedicineForm () {
  const [state, dispatch] = useFormState(registerProduct, {
    success: false,
    message: ''
  })

  return (
    <form action={dispatch} className="flex flex-col gap-y-6 items-end">
      {
        state.success && (
          <div className="flex flex-col gap-y-2 w-full bg-green-100 p-4 rounded-sm">
            Produto cadastrado com sucesso!
          </div>
        )
      }
      {
        state.errors && (
          <div className="flex flex-col gap-y-2 w-full bg-red-200 p-4 rounded-sm">
            {
              state.errors?.name?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
            {
              state.errors?.price?.map(error => (
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
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="name">
            Nome <span className="text-primary-100">*</span>
          </label>
          <input type="text" name="name" id="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="type">
            Tipo
          </label>
          <input type="text" name="type" id="type" placeholder="Tipo" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="origin">
            Origem
          </label>
          <input name="origin" type="text" id="origin" placeholder="Origem" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="designation">
            Designação
          </label>
          <input name="designation" type="text" id="designation" placeholder="Designação" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="weight">
            Peso (mg)
          </label>
          <input name="weight" type="number" min={0} id="weight" placeholder="Peso em miligramas" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="expiration">
            Expiração
          </label>
          <input name="expiration" type="date" id="expiration" placeholder="Expiração" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="price">
          Preço <span className="text-primary-100">*</span>
        </label>
        <input name="price" type="number" min={0} step={0.1} id="price" placeholder="Preço" className="p-3 bg-lightestGray rounded" />
      </div>
      <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
    </form>
  )
}