import Image from "next/image";
import Logo from "./ui/logo";
import Link from "next/link";

export default function Login () {
  return (
    <main className="flex flex-col w-full relative overflow-hidden text-sm text-veryDarkGray md:h-screen md:flex-row">
      <div className="w-full h-full p-12 md:w-1/2 bg-lightestGray md:bg-white">
        <Logo
          className="mb-4"
        />
        <h1 className="text-3xl mb-2 md:text-4xl">Gerir sua farmácia nunca foi tão fácil.</h1>
        <h4 className="text-xs font-bold">Crie sua conta e experimente mais facilidade.</h4>
        <Image
          className="hidden absolute bottom-[-300px] left-0 md:block"
          width={1164}
          height={891}
          src="/img/dashboard-clone.png"
          alt="Dashboard Clone Background"
        />
      </div>
      <div className="flex justify-center items-center bg-white w-full h-full p-12 z-10 shadow-2xl md:w-1/2">
        <form className="flex flex-col gap-6 w-full pb-12 sm:w-[500px]">
          <div>
            <h2 className="text-2xl mb-4 md:text-3xl">Faça Login</h2>
            <p>Preencha os campos requisitados abaixo</p>
          </div>
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
            <button
              className="w-full h-[50px] bg-primary-100 text-white rounded"
            >
              Login
            </button>
            <span className="font-bold">Ou</span>
            <button
              className="w-full h-[50px] bg-gray-300 font-bold rounded"
            >
              Faça Login com o Google
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
      </div>
    </main>
  );
}
