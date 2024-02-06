'use client'

import { authenticate } from "@/lib/actions/authenticate";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { FaGoogle } from "react-icons/fa";

export function LoginForm () {
  const [state, dispatch] = useFormState(authenticate, {})

  return (
    <form action={dispatch} className="flex flex-col gap-6 w-full pb-12 sm:w-[500px]">
      <div>
        <h2 className="text-2xl mb-4 md:text-3xl">Faça Login</h2>
        <p>Preencha os campos requisitados abaixo</p>
      </div>
      {
        (state.errors || state.message) && (
          <div className="p-4 bg-red-100 rounded-sm flex flex-col gap-y-1">
            { state.errors?.email?.map(e => <p key={e}>{e}</p>) }
            { state.errors?.password?.map(e => <p key={e}>{e}</p>) }
            { state.message }
          </div>
        )
      }
      <div className="flex flex-col">
        <input
          placeholder="Seu email"
          type="email"
          name="email"
          className="w-full h-[50px] bg-lightestGray px-4 py-2 mb-2 border-none"
        />
        <input
          placeholder="Sua password"
          type="password"
          name="password"
          className="w-full h-[50px] bg-lightestGray px-4 py-2 border-none"  
        />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:justify-between">
        <div className="flex items-center gap-1">
          <input type="checkbox" id="keep-logged-in" />
          <label
            className="cursor-pointer select-none"
            htmlFor="keep-logged-in"
          >
            Mantenha-me logado
          </label>
        </div>
        <Link
          className="underline text-gray-400"
          href="/help"
        >
          Esqueceu sua senha?
        </Link>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <SubmitButton />
        <span className="font-bold">Ou</span>
        <button
          className="w-full h-[50px] bg-gray-300 font-bold rounded"
        >
          <p className="flex justify-center items-center gap-2">
            <FaGoogle /> Faça Login com o Google
          </p>
        </button>
      </div>
      <p className="m-auto">
        Novo no Ez Pharma?{' '}
        <Link
          className="underline text-gray-400"
          href="/signup"
        >
          Criar conta.
        </Link>
      </p>
    </form>
  )
}

function SubmitButton () {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className="w-full h-[50px] bg-primary-100 text-white rounded disabled:bg-primary-25 disabled:text-veryDarkGray"
      disabled={pending}
    >
      Login{ pending && '...' }
    </button>
  )
}