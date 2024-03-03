'use client'

import { useFormState } from "react-dom";
import { CustomSwitch } from "./switch";
import { registerSupplier } from "@/lib/actions/register/suppliers";

export function CreateSupplierForm () {
  const [state, dispatch] = useFormState(registerSupplier, {
    success: false,
    message: ''
  })

  return (
    <form action={dispatch} className="flex flex-col gap-y-6 items-end">
      {
        state.success && (
          <div className="flex flex-col gap-y-2 w-full bg-green-100 p-4 rounded-sm">
            Fornecedor cadastrado com sucesso!
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
          <label htmlFor="address">
            Endereço
          </label>
          <input type="text" name="address" id="address" placeholder="Endereço" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="contact">
          Contacto
        </label>
        <input type="text" name="contact" id="contact" placeholder="Contacto" className="p-3 bg-lightestGray rounded" />
      </div>
      <div className="flex flex-col gap-1 w-full">
      <CustomSwitch name="isAvailable" label='Disponível' />
        
      </div>
      <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
    </form>
  )
}