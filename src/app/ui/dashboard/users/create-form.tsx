'use client'

import { registerUser } from "@/lib/actions/register/users"
import { useFormState } from "react-dom"

export function CreateUserForm () {
  const [state, dispatch] = useFormState(registerUser, {
    success: false,
    message: ''
  })
  console.log(state)

  return (
    <form action={dispatch} className="flex flex-col gap-y-6 items-end">
      {
        state.success && (
          <div className="flex flex-col gap-y-2 w-full bg-green-100 p-4 rounded-sm">
            Usuário cadastrado com sucesso!
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
              state.errors?.email?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
            {
              state.errors?.permission?.map(error => (
                <p key={error}>{error}</p>
              ))
            }
            {
              state.errors?.password?.map(error => (
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
          <input type="text" id="name" name="name" placeholder="Nome" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="email">
            Email <span className="text-primary-100">*</span>
          </label>
          <input type="email" id="email" name="email" placeholder="Email" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="permission">
            Permissão <span className="text-primary-100">*</span>
          </label>
          <select defaultValue={'standard'} id="permission" className="p-3 bg-lightestGray rounded" name="permission">
            <option value="standard">Padrão</option>
            <option value="manager">Gestor</option>
            <option value="admin">Administrador</option>
          </select>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="role">
            Palavra-passe
          </label>
          <input type="password" id="password" placeholder="Sua senha" name="password" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex w-full gap-x-6">
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="contact">
            Contacto
          </label>
          <input type="text" id="contact" name="contact" placeholder="Contacto" className="p-3 bg-lightestGray rounded" />
        </div>
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="address">
            Endereço
          </label>
          <input type="text" id="address" name="address" placeholder="Endereço" className="p-3 bg-lightestGray rounded" />
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <label htmlFor="role">
          Função
        </label>
        <input type="text" id="role" placeholder="Função" name="role" className="p-3 bg-lightestGray rounded" />
      </div>
      <button type="submit" className="px-6 py-2 bg-primary-100 text-white rounded mt-6">Adicionar</button>
    </form>
  )
}