import { ArrowTrendingDownIcon, ArrowTrendingUpIcon, BeakerIcon, ChartBarIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { RightSideBar } from "../ui/dashboard/right-side-bar/right-side-bar";
import Link from "next/link";
import { fetchInfoCardData, fetchLastSales } from "@/lib/data/fetch";
import { formatDate, formatNumber } from "@/lib/utils";
import clsx from "clsx";

const InfoCard = ({
  title,
  amount,
  rate,
  icon,
  showRate = false
}: {
  title: string;
  amount: number;
  rate: number;
  icon: React.ReactNode;
  showRate?: boolean;
}) => (
  <div className="flex w-full md:w-1/3 h-[135px] p-6 gap-4 bg-white rounded-md">
    <div className="flex items-center h-full">
      <div className="flex justify-center items-center w-10 h-10 bg-primary-25 rounded-full">
        { icon }
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p>{ title }</p>
      <p className="text-3xl">{ formatNumber(amount) }</p>
        {
          showRate && (
            <p className="flex gap-1 text-xs">
              <span className={clsx(
                "flex gap-1",
                {
                  "text-red-400": rate < 0,
                  "text-primary-100": rate >= 0
                }
              )}>
                {
                  rate >= 0 ?
                    <ArrowTrendingUpIcon className="w-3 h-3"/> :
                    <ArrowTrendingDownIcon className="w-3 h-3"/>
                }
                { rate }%
              </span> Este mês
            </p>
          )
        }
    </div>
  </div>
)

const TableHead = () => {
  const cols = [
    'Vendedor',
    'Item',
    'Data',
    'Preço',
    'Quantidade'
  ]

  return (
    <div className="grid grid-cols-5">
      {
        cols.map(name => (
          <div key={name} className="font-bold text-darkGray">{ name }</div>
        ))
      }
    </div>
  )
}

export default async function Dashboard () {
  const saleItens = await fetchLastSales()
  const {
    saleCostAvg,
    totalSales,
    productPriceAvg
  } = await fetchInfoCardData()

  return (
    <div className="flex flex-col md:flex-row gap-y-2 w-full md:h-full bg-mediumLightGray overflow-auto max-h-[calc(100vh-80px)]">
      <div className="flex flex-col gap-6 w-full h-full p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <InfoCard
            title="Total de itens vendidos" amount={totalSales.amount} rate={totalSales.rate}
            icon={<ShoppingCartIcon className="w-6 h-6" />}
            showRate
          />
          <InfoCard
            title="Preço médio de venda" amount={saleCostAvg} rate={0}
            icon={<BeakerIcon className="w-6 h-6" />}
          />
          <InfoCard
            title="Preço médio de produtos" amount={productPriceAvg} rate={0}
            icon={<ChartBarIcon className="w-6 h-6" />}
          /> 
        </div>
        {/* <div className="w-full h-[320px] p-6 bg-veryDarkGray rounded-md">
           <span className="text-white">Relatório de Vendas</span>
        </div> */}
        <div className="flex flex-col gap-6 p-6 bg-white rounded-md">
          <h3 className="text-xl font-bold">Últimos itens vendidos</h3>
          <div className="flex flex-col gap-4 overflow-x-auto">
            <TableHead />
            <div className="flex flex-col gap-2">
              {
                saleItens.map((sale, index) => (
                  <div key={index} className="grid grid-cols-5 p-1 bg-lightestGray rounded-sm">
                    <div><p>{sale.saler}</p></div>
                    <div>
                      <p>{sale.iten}</p>
                      <p className="text-xs">{sale.origin}</p>
                    </div>
                    <div>
                      <p>{formatDate(new Date(sale.date), 'D/MM 	HH:mm')}</p>
                    </div>
                    <div>
                      <p className="font-bold text-primary-100">{sale.price}</p>
                      <p className="text-xs">Kwanzas</p>
                    </div>
                    <div>
                      <p>{sale.amount}{sale.amount > 1 ? ' Itens' : ' Item'}</p>
                    </div>
                  </div>
                ))
              }
              {
                !saleItens.length && (
                  <p className="text-center">Sem dados ainda</p>
                )
              }
            </div>
          </div>
          <Link
            className="flex justify-center items-center w-full h-9 font-bold bg-primary-25 rounded-sm hover:bg-primary-100 hover:text-white duration-300"
            href="/dashboard/sales"
          >
            Ver todas as vendas
          </Link>
        </div>
      </div>
      <RightSideBar />
    </div>
  )
}