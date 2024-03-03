'use client'

import { registerOutlet } from "@/lib/actions/register/outlets"
import { useFormState } from "react-dom"

export function CreateOutletForm () {
  const [state, register] = useFormState(registerOutlet, {
    success: false,
    message: ''
  })

  return (
    <form action={register} className="flex flex-col gap-y-6 items-end">
      {
        state.success && (
          <div className="flex flex-col gap-y-2 w-full bg-green-100 p-4 rounded-sm">
            Ponto de venda cadastrado com sucesso!
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
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="name">
          Nome <span className="text-primary-100">*</span>
        </label>
        <input type="text" id="name" name="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="type">
          Localização
        </label>
        <input type="text" id="type" name="location" placeholder="Localização" className="p-3 bg-lightestGray rounded" />
      </div>
      <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
    </form>
  )
}