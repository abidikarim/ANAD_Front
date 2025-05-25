import { ListResponse } from "./listResponse"

export class PagedResponse<T> extends ListResponse<T>{
    page_number!:number
    page_size!:number
    total_page!:number
    total_records!:number
}