import { BaseResponse } from "./baseResponse";

export class Admin extends BaseResponse {
    id!:number;
    first_name!:string;
    last_name!:string;
    email!:string;
    password?:string;
    confirm_password?:string;
}