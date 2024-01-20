import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import clsx from "clsx"

const InfoCard = ({
  title,
  amount
}: {
  title: string;
  amount: number;
}) => {
  return (
    <div className="flex flex-col justify-between gap-6 w-1/2 px-4 py-6 bg-white rounded-md">
      <p className="text-xs text-darkGray">{ title }</p>
      <p className="text-2xl text-primary-100">{ amount },00<span>Kz</span></p>
    </div>
  )
}

export function RightSideBar () {
  return (
    <div className="flex flex-col gap-4 w-[420px] shrink-0 p-4 bg-lightestGray">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Resultados das vendas <span className="ml-1 font-normal text-xs text-darkGray">Este mês</span></h4>
        <div className="flex gap-2">
          <InfoCard title="Total de vendas semanais" amount={0} />
          <InfoCard title="Total de vendas mensais" amount={0} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Hoje <span className="ml-1 font-normal text-xs text-darkGray">{
          (new Date()).toLocaleDateString().split('T')[0]
        }</span></h4>
        <div className="p-4 bg-white rounded-sm">
          <div className="flex justify-between mb-2">
            <p>Janeiro</p>
            <div className="flex gap-2">
              <ArrowLeftIcon className="w-4 cursor-pointer" />
              <ArrowRightIcon className="w-4 cursor-pointer" />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-2">
            {
              (new Array(35)).fill(null).map((_, index) => (
                <div key={index} className={clsx(
                  "flex justify-center items-center w-[calc(100%/9)] h-8 shadow-md cursor-pointer rounded-md",
                  {
                    "bg-primary-100 text-white": index + 1 == (new Date).getDate()
                  }
                )}>
                  { index % 31 + 1 }
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Eventos <span className="ml-1 font-normal text-xs text-darkGray">Janeiro de 2024</span></h4>
      </div>
    </div>
  )
}