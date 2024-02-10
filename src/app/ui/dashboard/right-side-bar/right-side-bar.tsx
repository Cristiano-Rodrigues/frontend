import { formatDate } from "@/lib/utils";
import { Calendar } from "./calendar";

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
  const date = new Date()
  return (
    <div className="flex flex-col gap-4 w-full md:w-[420px] shrink-0 p-4 bg-lightestGray">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Resultados das vendas <span className="ml-1 font-normal text-xs text-darkGray">Este mês</span></h4>
        <div className="flex gap-2">
          <InfoCard title="Total de vendas semanais" amount={0} />
          <InfoCard title="Total de vendas mensais" amount={0} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Hoje <span className="ml-1 font-normal text-xs text-darkGray">{
          formatDate(date, 'D [de] MMMM [de] YYYY')
        }</span></h4>
        <Calendar />
      </div>
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Eventos <span className="ml-1 font-normal text-xs text-darkGray">{
          formatDate(date, 'MMMM [de] YYYY')
        }</span></h4>
      </div>
    </div>
  )
}