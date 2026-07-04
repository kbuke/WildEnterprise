type formatDate = {
    date: string
}

export function formatDate({
    date
}: formatDate){
    if(!date) return null;

    const formattedDate = new Date(date + "Z") // Z tells JS that this is UTC, not local time

    return formattedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
}