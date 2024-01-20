import Image from "next/image";
import Logo from "../ui/logo";
import Link from "next/link";

export default function Signup () {
  return (
    <main className="flex flex-col w-full relative overflow-hidden text-sm text-veryDarkGray md:h-screen md:flex-row">
      <div className="w-full h-full p-12 md:w-1/2">
        <Logo
          className="mb-4"
        />
        <h1 className="text-4xl mb-2">Gerir sua farmácia nunca foi tão fácil.</h1>
        <h4 className="font-bold">Crie sua conta e experimente gratuitamente por 30 dias.</h4>
        <Image
          className="hidden absolute bottom-[-300px] left-0 md:block"
          width={1164}
          height={891}
          src="/img/dashboard-clone.png"
          alt="Dashboard Clone Background"
        />
      </div>
      <div className="flex justify-center items-center bg-white w-full h-full p-12 z-10 shadow-2xl md:w-1/2">
        <div className="flex flex-col gap-6 w-full pb-12 sm:w-[500px]">
          <div>
            <h2 className="text-3xl mb-4">Crie sua conta</h2>
            <p>Preencha os campos requisitados abaixo</p>
          </div>
          <div className="flex flex-col">
          <input
              placeholder="Seu nome completo"
              type="text"
              className="w-full h-[50px] bg-lightestGray px-4 py-2 mb-2"
            />
            <input
              placeholder="Seu email"
              type="email"
              className="w-full h-[50px] bg-lightestGray px-4 py-2 mb-2"
            />
            <input
              placeholder="Sua password"
              type="password"
              className="w-full h-[50px] bg-lightestGray px-4 py-2"  
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <button
              className="w-full h-[50px] bg-primary-100 text-white rounded"
            >
              Criar conta
            </button>
            <span className="font-bold">Ou</span>
            <button
              className="w-full h-[50px] bg-gray-300 font-bold rounded"
            >
              Inicie com o Google
            </button>
          </div>
          <p className="m-auto">
            Já possui uma conta?{' '}
            <Link
              className="underline text-gray-400"
              href="/"
            >
              Fazer login.
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
