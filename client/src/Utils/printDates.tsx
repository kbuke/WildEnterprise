import { formatDate } from "./formatDate"

type PrintDatesType = {
    dateType: string,
    date: string
}

export function printDates({
    dateType,
    date
}: PrintDatesType){
    return(
        <p className="text-2xl"><span className="font-bold">{dateType}: </span>{formatDate({date: date})}</p>
    )
}