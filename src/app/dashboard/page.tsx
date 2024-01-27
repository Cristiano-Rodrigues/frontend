import { BeakerIcon, CubeIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import { RightSideBar } from "../ui/dashboard/right-side-bar";
import Link from "next/link";

const InfoCard = ({
  title,
  amount,
  rate,
  icon,
}: {
  title: string;
  amount: number;
  rate: number;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center w-1/3 h-[135px] p-6 gap-4 bg-white rounded-md">
    <div>
      <div className="flex justify-center items-center w-10 h-10 bg-primary-25 rounded-full">
        { icon }
      </div>
    </div>
    <div className="flex flex-col gap-2">
      <p>{ title }</p>
      <p className="text-3xl">{ amount }</p>
      <p className="text-xs"><span>{ rate }%</span> Este mês</p>
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
    <div className="flex gap-24">
      {
        cols.map(name => (
          <div key={name} className="max-w-[100px] h-8 font-bold text-darkGray">{ name }</div>
        ))
      }
    </div>
  )
}

export default function Dashboard () {
  return (
    <div className="flex w-full h-full bg-mediumLightGray">
      <div className="flex flex-col gap-6 w-full h-full p-6">
        <div className="flex gap-4">
          <InfoCard title="Vendas" amount={0} rate={0} icon={<ShoppingCartIcon className="w-6 h-6" />} />
          <InfoCard title="Remédios" amount={0} rate={0} icon={<BeakerIcon className="w-6 h-6" />} />
          <InfoCard title="Diversos" amount={0} rate={0} icon={<CubeIcon className="w-6 h-6" />} /> 
        </div>
        {/* <div className="w-full h-[320px] p-6 bg-veryDarkGray rounded-md">
           <span className="text-white">Relatório de Vendas</span>
        </div> */}
        <div className="flex flex-col gap-6 p-6 bg-white rounded-md">
          <h3 className="text-xl font-bold">Lista de Vendas</h3>
          <div className="flex flex-col gap-4">
            <TableHead />
            <div className="flex flex-col gap-2">
              <p className="text-center">Sem dados ainda</p>
            </div>
          </div>
          <Link
            className="flex justify-center items-center w-full h-9 font-bold bg-primary-25 rounded-sm hover:bg-primary-100 hover:text-white duration-300"
            href="/sales"
          >
            Ver mais
          </Link>
        </div>
      </div>
      <RightSideBar />
    </div>
  )
}