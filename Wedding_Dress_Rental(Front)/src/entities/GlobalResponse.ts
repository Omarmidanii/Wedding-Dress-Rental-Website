import meta from "./metaResponse";

export default interface Response<T> {
    status: string;
    data: T;
    message: string;
  }

  export interface GetAllResponse<T>{
    status : string;
    data : T[];
    message: string;
  }

export interface GetAllResponseWithPaginate<T>{
  status : string;
  data : T[],
  meta? : meta;
  message : string;
}
