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

      <TableBody size={columns.length} data={data} />
    </div>
  )
}

const TableHead = ({ columns }: { columns: string[]; }) => {
  return (
    <div className="flex items-center gap-6 min-w-min mb-1 bg-white rounded-t-md border-b-2 border-darkGray">
      <div className="p-4">
        <input type="checkbox" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`
        }}
        className="w-full gap-2"
      >
        {
          columns.map(column => (
            <div key={column} className="flex items-center gap-2 min-w-[100px] shrink-0">
              <p>{ column }</p>
              <ArrowDownIcon  className="w-3 h-3" />
            </div>
          ))
        }
      </div>
    </div>
  )
}

const TableBody = ({ data, size }: { data: any[]; size: number }) => {
  return (
    <div className="flex flex-col gap-1">
      {
        data.map(row => (
          <TableRow key={row.id} row={row} size={size} />
        ))
      }
    </div>
  )
}

const TableRow = ({ row, size }: { row: any; size: number }) => {
  const keys = Object.keys(row).filter(key => key != 'id')
  return (
    <div className="flex items-center gap-6 min-w-min bg-white hover:bg-primary-25 duration-300 cursor-pointer">
      <div className="p-4">
        <input type="checkbox" />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 1fr)`
        }}
        className="w-full gap-2"
      >
        {
          keys.map(key => (
            <div key={key} className="min-w-[100px] shrink-0">
              <p>{
                !!row[key] ? row[key] : 'N/A'  
              }</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}