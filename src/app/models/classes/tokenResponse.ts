import { BaseResponse } from "./baseResponse";

export class TokenResponse extends BaseResponse {
    type!:string;
    access_token!:string;
}