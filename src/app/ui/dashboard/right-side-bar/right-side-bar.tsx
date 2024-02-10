import { formatDate, formatNumber } from "@/lib/utils";
import { Calendar } from "./calendar";
import { fetchSaleResults } from "@/lib/data/fetch";

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
      <p className="text-2xl text-primary-100">{ formatNumber(amount) }<span>Kz</span></p>
    </div>
  )
}

export async function RightSideBar () {
  const date = new Date()
  const {
    lastMonthSalesSum,
    lastWeekSalesSum
  } = await fetchSaleResults()


  return (
    <div className="flex flex-col gap-4 w-full md:w-[420px] shrink-0 p-4 bg-lightestGray">
      <div className="flex flex-col gap-2">
        <h4 className="font-bold">Resultados das vendas <span className="ml-1 font-normal text-xs text-darkGray">Este mês</span></h4>
        <div className="flex gap-2">
          <InfoCard title="Total dos últimos 7 dias" amount={lastWeekSalesSum} />
          <InfoCard title="Total dos últimos 30 dias" amount={lastMonthSalesSum} />
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