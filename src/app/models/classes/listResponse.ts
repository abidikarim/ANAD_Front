import { BaseResponse } from "./baseResponse";

export class ListResponse<T> extends BaseResponse {
    list!: T[]
}