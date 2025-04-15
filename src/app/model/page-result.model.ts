export default interface PageResultModel<T> {
   content: T;
   totalElements: number;
   totalPages: number;
}

export interface PageModel<T> extends PageResultModel<T> {
   page: number;
   limit: number
}
