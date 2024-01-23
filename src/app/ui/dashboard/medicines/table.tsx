import { ArrowDownIcon } from "@heroicons/react/24/outline"

export function CustomTable ({
  columns,
  data
}: {
  columns?: string[];
  data: any[];
}) {
  columns = columns ? columns : Object.keys(data[0]);

  return (
    <div className="w-full overflow-auto">
      <TableHead columns={columns} />

      <TableBody data={data} />
    </div>
  )
}

const TableHead = ({ columns }: { columns: string[]; }) => {
  return (
    <div className="flex items-center gap-6 min-w-min mb-1 bg-white rounded-t-md border-b-2 border-darkGray">
      <div className="p-4">
        <input type="checkbox" />
      </div>

      {
        columns.map(column => (
          <div key={column} className="flex justify-between items-center w-[100px] shrink-0">
            <p>{ column }</p>
            <ArrowDownIcon  className="w-3 h-3" />
          </div>
        ))
      }
    </div>
  )
}

const TableBody = ({ data }: { data: any[]; }) => {
  return (
    <div className="flex flex-col gap-1">
      {
        data.map(row => (
          <TableRow key={row.id} row={row} />
        ))
      }
    </div>
  )
}

const TableRow = ({ row }: { row: any; }) => {
  const keys = Object.keys(row).slice(1);
  return (
    <div className="flex items-center gap-6 min-w-min bg-white hover:bg-primary-25 duration-300 cursor-pointer">
      <div className="p-4">
        <input type="checkbox" />
      </div>

      {
        keys.map(key => (
          <div key={key} className="w-[100px] shrink-0">
            <p>{ row[key] }</p>
          </div>
        ))
      }
    </div>
  )
}