import Image from "next/image";
import Logo from "./ui/logo";
import { LoginForm } from "./ui/login-form";

export default function Login () {
  return (
    <main className="flex flex-col w-full relative overflow-hidden text-sm text-veryDarkGray md:h-screen md:flex-row">
      <div className="w-full h-full p-12 md:w-1/2 bg-lightestGray md:bg-white">
        <Logo
          className="mb-4"
        />
        <h1 className="text-3xl mb-2 md:text-4xl">Gerir sua farmácia nunca foi tão fácil.</h1>
        <h4 className="text-xs font-bold md:text-sm">Crie sua conta e experimente mais facilidade.</h4>
        <Image
          className="hidden absolute bottom-[-300px] left-0 md:block"
          width={1164}
          height={891}
          src="/img/dashboard-clone.png"
          alt="Dashboard Clone Background"
        />
      </div>
      <div className="flex justify-center items-center bg-white w-full h-full p-12 z-10 shadow-2xl md:w-1/2">
        <LoginForm />
      </div>
    </main>
  );
}
