import { BellIcon } from "@heroicons/react/24/outline";

export function Topbar () {
  return (
    <div className="flex justify-between w-full h-[80px] bg-white px-6 py-4">
      <div className="flex items-center gap-2">
        <label htmlFor="outlet">Escolha a farmácia</label>
        <select
          id="outlet"
          className="border-none min-w-60 h-[35px] bg-lightestGray"
        ></select>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex justify-center items-center w-8 h-8 rounded-sm">
          <BellIcon className="w-5 h-5" />
        </button>
        <div className="relative">
          <div className="w-12 h-12 bg-mediumLightGray rounded-full"></div>
          <div className="absolute hidden bottom-[-10px] right-0 translate-y-full w-max p-4 bg-mediumLightGray rounded-sm z-10">
            <div className="px-4 py-1 cursor-pointer">Trocar de conta</div>
            <div className="px-4 py-1 cursor-pointer">Sair</div>
          </div>
        </div>
      </div>
    </div>
  )
}