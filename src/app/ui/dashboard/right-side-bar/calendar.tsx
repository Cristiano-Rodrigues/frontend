'use client'

import clsx from "clsx"
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { formatDate } from "@/lib/utils"

export function Calendar () {
  const initialDate = new Date()
  const [currentDate, setCurrentDate] = useState(initialDate)

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-sm">
      <div className="flex justify-between mb-2">
        <p>{ formatDate(currentDate, 'MMMM de YYYY') }</p>
        <div className="flex gap-2">
          <ArrowLeftIcon
            className="w-4 cursor-pointer select-none"
            onClick={() => {
              currentDate.setMonth(currentDate.getMonth() - 1)
              setCurrentDate(new Date(currentDate))
            }}
          />
          <ArrowRightIcon
            className="w-4 cursor-pointer select-none"
            onClick={() => {
              currentDate.setMonth(currentDate.getMonth() + 1)
              setCurrentDate(new Date(currentDate))
            }}
          />
        </div>
      </div>
      <div className="grid grid-cols-7">
        {
          'Dom,Seg,Ter,Qua,Qui,Sex,Sáb'.split(',').map(day => (
            <p key={day} className="mx-auto text-darkGray">{ day }</p>
          ))
        }
      </div>
      <CalendarDays date={currentDate} initialDate={initialDate} />
    </div>
  )
}

const getFirstWeekday = (year: number, month: number) => {
  return (new Date(year, month, 1)).getDay()
}

const getLastday = (year: number, month: number) => {
  return (new Date(year, month + 1, 0)).getDate()
}

function CalendarDays ({
  date,
  initialDate
}: {
  date: Date;
  initialDate: Date;
}) {
  const [year, month] = [date.getFullYear(), date.getMonth()]
  const start = getFirstWeekday(year, month)
  const end = getLastday(year, month)
  const lastMonthEnd = getLastday(year, month - 1)

  return (
    <div className="grid grid-cols-7 grid-rows-6 gap-2">
      {
        (new Array(42)).fill(null).map((_, index) => {
          const isCurrentDay = (
            initialDate.getFullYear() == date.getFullYear() &&
            initialDate.getMonth() == date.getMonth() &&
            date.getDate() == index + 1
          )
          const isInBetweenMonth = index >= start && index - start < end

          return (
            <div key={index} className={clsx(
              "flex justify-center items-center w-full h-8 cursor-pointer",
              {
                "shadow-md rounded-md": isInBetweenMonth,
                "bg-primary-100 text-white": isCurrentDay,
              }
            )}>
              { index < start ? (
                lastMonthEnd - (start - index - 1)
              ) : (index - start) % end + 1 }
            </div>
          )
        })
      }
    </div>
  )
}