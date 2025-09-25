export function toFormatedDate(date?: Date){
    return date ? 
        new Date(date).toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short",
        }).replace(',' ,'  às')
        : 
        "";
}